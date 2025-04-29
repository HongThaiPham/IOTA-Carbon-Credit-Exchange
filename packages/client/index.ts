import {
  getFullnodeUrl,
  IotaClient,
  Network,
  type CoinBalance,
} from "@iota/iota-sdk/client";
import { decodeIotaPrivateKey } from "@iota/iota-sdk/cryptography";
import { Ed25519Keypair } from "@iota/iota-sdk/keypairs/ed25519";
import { Transaction } from "@iota/iota-sdk/transactions";

const { secretKey } = decodeIotaPrivateKey(process.env.PRIVATE_KEY!);
const mainKeypair = Ed25519Keypair.fromSecretKey(secretKey);

const { secretKey: otherSecretKey } = decodeIotaPrivateKey(
  process.env.PRIVATE_KEY_2!
);
const otherKeypair = Ed25519Keypair.fromSecretKey(otherSecretKey);

// create a new IotaClient object pointing to the network you want to use
const iotaClient = new IotaClient({ url: getFullnodeUrl(Network.Testnet) });

const CREDIT_CARBON_MANAGER_PACKAGE = process.env
  .CREDIT_CARBON_MANAGER_PACKAGE as string;
const MINTER_PASS_CONFIG_ADDRESS = process.env
  .MINTER_PASS_CONFIG_ADDRESS as string;
const CREDIT_TOKEN_MANAGER_ADDRESS = process.env
  .CREDIT_TOKEN_MANAGER_ADDRESS as string;

(async () => {
  {
    const receiverAddress = otherKeypair.getPublicKey().toIotaAddress();
    const tx = new Transaction();

    tx.moveCall({
      package: CREDIT_CARBON_MANAGER_PACKAGE,
      module: "credit_carbon_manager",
      function: "issue_minter_pass_nft",
      arguments: [
        tx.object(MINTER_PASS_CONFIG_ADDRESS),
        tx.pure.string(
          "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg"
        ),
        tx.pure.address(receiverAddress),
      ],
    });

    const result = await iotaClient.signAndExecuteTransaction({
      signer: mainKeypair,
      transaction: tx,
    });
    console.log(
      "credit_carbon_manager::issue_minter_pass_nft result: ",
      result
    );
  }

  {
    const caller = otherKeypair;

    const receiverAddress = Ed25519Keypair.generate()
      .getPublicKey()
      .toIotaAddress();

    const proof = await iotaClient.getOwnedObjects({
      owner: caller.getPublicKey().toIotaAddress(),
      filter: {
        StructType: `${CREDIT_CARBON_MANAGER_PACKAGE}::minter_pass_nft::MinterPassNFT`,
      },
    });

    console.log("proof: ", proof);

    if (!proof || proof.data.length === 0) {
      console.error("No proof found");
      return;
    }

    const firstNft = proof.data[0];

    const tx = new Transaction();

    tx.moveCall({
      package: CREDIT_CARBON_MANAGER_PACKAGE,
      module: "credit_carbon_manager",
      function: "mint_credit_token",
      arguments: [
        tx.object(CREDIT_TOKEN_MANAGER_ADDRESS),
        tx.object(firstNft?.data?.objectId!),
        tx.pure.u64(13),
        tx.pure.address(receiverAddress),
      ],
      typeArguments: [
        `${CREDIT_CARBON_MANAGER_PACKAGE}::credit_token::CREDIT_TOKEN`,
      ],
    });

    const result = await iotaClient.signAndExecuteTransaction({
      signer: caller,
      transaction: tx,
    });
    console.log("credit_carbon_manager::mint_credit_token result: ", result);
  }
})();
