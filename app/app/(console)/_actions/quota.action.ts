"use server";
import supabaseServer from "@/lib/supabase.server";
import { decodeIotaPrivateKey } from "@iota/iota-sdk/cryptography";
import { Transaction } from "@iota/iota-sdk/transactions";
import { Ed25519Keypair } from "@iota/iota-sdk/keypairs/ed25519";
import { getFullnodeUrl, IotaClient, Network } from "@iota/iota-sdk/client";
import {
  CARBON_TOKEN_TYPE,
  CREDIT_CARBON_MANAGER_PACKAGE,
  CREDIT_CARBON_TABLE_ADDRESS,
  CREDIT_POINT_UPDATE_CAP_TYPE,
  MINTER_NFT_TYPE,
  MINTER_PASS_CONFIG_ADDRESS,
} from "@/lib/constants";

const { secretKey } = decodeIotaPrivateKey(process.env.PRIVATE_KEY!);
const mainKeypair = Ed25519Keypair.fromSecretKey(secretKey);

const iotaClient = new IotaClient({ url: "https://api.mainnet.iota.cafe" });

export async function updateQuota(id: string, value: number) {
  return supabaseServer
    .from("credit-quota")
    .update({ credit_amount: value })
    .eq("id", id);
}

export async function updateQuotaOnchain(receiver: string, amount: number) {
  const updateCap = await iotaClient.getOwnedObjects({
    owner: mainKeypair.getPublicKey().toIotaAddress(),
    filter: {
      StructType: CREDIT_POINT_UPDATE_CAP_TYPE,
    },
  });
  if (!updateCap || updateCap.data.length === 0) {
    console.error("No update cap found");
    return;
  }

  const firstCap = updateCap.data[0];
  const capObjectId = firstCap?.data?.objectId;
  if (!capObjectId) {
    console.error("No cap object ID found");
    return;
  }

  const proof = await iotaClient.getOwnedObjects({
    owner: receiver,
    filter: {
      StructType: MINTER_NFT_TYPE,
    },
  });

  if (!proof || proof.data.length === 0) {
    console.error("No proof found");
    return;
  }

  const firstNft = proof.data[0];
  const nftObjectId = firstNft?.data?.objectId;

  if (!nftObjectId) {
    console.error("No NFT object ID found");
    return;
  }

  const tx = new Transaction();

  tx.moveCall({
    package: CREDIT_CARBON_MANAGER_PACKAGE,
    module: "credit_carbon_manager",
    function: "update_credit_points",
    arguments: [
      tx.object(CREDIT_CARBON_TABLE_ADDRESS),
      tx.object(nftObjectId),
      tx.pure.u64(amount),
      tx.object(capObjectId),
    ],
  });

  const result = await iotaClient.signAndExecuteTransaction({
    signer: mainKeypair,
    transaction: tx,
  });

  console.log("credit_carbon_manager::update_credit_points result: ", result);

  return result;
}

export async function getQuotaItem() {
  const { data, error } = await supabaseServer
    .from("credit-quota")
    .select("*")
    .eq("mint", CARBON_TOKEN_TYPE)
    .order("org_name", { ascending: true });

  if (error) {
    console.error("Error fetching quota items:", error);
    return [];
  }

  return data;
}

export async function updateQuotaIdentity(id: string, wallet: string) {
  const { data, error } = await supabaseServer
    .from("credit-quota")
    .update({ wallet, mint: CARBON_TOKEN_TYPE })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating user identity:", error);
    return null;
  }

  if (data.wallet && data.mint) {
    await issueMinterRole(data.wallet);
  }

  if (data.credit_amount) {
    await updateQuotaOnchain(wallet, data.credit_amount);
  }

  return data;
}

export async function issueMinterRole(to: string) {
  const tx = new Transaction();

  tx.moveCall({
    package: CREDIT_CARBON_MANAGER_PACKAGE,
    module: "credit_carbon_manager",
    function: "issue_minter_pass_nft",
    arguments: [
      tx.object(CREDIT_CARBON_TABLE_ADDRESS),
      tx.object(MINTER_PASS_CONFIG_ADDRESS),
      tx.pure.string(
        "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg"
      ),
      tx.pure.address(to),
    ],
  });

  const result = await iotaClient.signAndExecuteTransaction({
    signer: mainKeypair,
    transaction: tx,
  });
  console.log("credit_carbon_manager::issue_minter_pass_nft result: ", result);

  return result;
}
