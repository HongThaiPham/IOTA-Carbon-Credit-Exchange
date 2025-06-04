import { getFullnodeUrl, IotaClient, Network } from "@iota/iota-sdk/client";
import { decodeIotaPrivateKey } from "@iota/iota-sdk/cryptography";
import { Ed25519Keypair } from "@iota/iota-sdk/keypairs/ed25519";
import { Inputs, Transaction } from "@iota/iota-sdk/transactions";

const { secretKey } = decodeIotaPrivateKey(process.env.PRIVATE_KEY!);
const mainKeypair = Ed25519Keypair.fromSecretKey(secretKey);

const { secretKey: otherSecretKey } = decodeIotaPrivateKey(
  process.env.PRIVATE_KEY_2!
);
const otherKeypair = Ed25519Keypair.fromSecretKey(otherSecretKey);

// create a new IotaClient object pointing to the network you want to use
const iotaClient = new IotaClient({ url: "https://api.mainnet.iota.cafe" });

const CREDIT_CARBON_MANAGER_PACKAGE = process.env
  .CREDIT_CARBON_MANAGER_PACKAGE as string;
const MINTER_PASS_CONFIG_ADDRESS = process.env
  .MINTER_PASS_CONFIG_ADDRESS as string;
const CREDIT_TOKEN_MANAGER_ADDRESS = process.env
  .CREDIT_TOKEN_MANAGER_ADDRESS as string;
const CREDIT_CARBON_TABLE_ADDRESS = process.env
  .CREDIT_CARBON_TABLE_ADDRESS as string;

(async () => {
  {
    const receiverAddress = otherKeypair.getPublicKey().toIotaAddress();
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
    const caller = mainKeypair;
    const receiverAddress = mainKeypair.getPublicKey().toIotaAddress();
    const tx = new Transaction();

    tx.moveCall({
      package: CREDIT_CARBON_MANAGER_PACKAGE,
      module: "credit_carbon_manager",
      function: "issue_credit_point_update_cap",
      arguments: [
        tx.object(MINTER_PASS_CONFIG_ADDRESS),
        tx.pure.address(receiverAddress),
      ],
    });

    const result = await iotaClient.signAndExecuteTransaction({
      signer: caller,
      transaction: tx,
    });

    console.log(
      "credit_carbon_manager::issue_credit_point_update_cap result: ",
      result
    );
  }

  {
    const caller = mainKeypair;
    const updateUser = otherKeypair;

    const updateCap = await iotaClient.getOwnedObjects({
      owner: caller.getPublicKey().toIotaAddress(),
      filter: {
        StructType: `${CREDIT_CARBON_MANAGER_PACKAGE}::minter_pass_nft::CreditPointUpdateCap`,
      },
    });
    if (!updateCap || updateCap.data.length === 0) {
      console.error("No update cap found");
      return;
    }

    const firstCap = updateCap.data[0];

    const proof = await iotaClient.getOwnedObjects({
      owner: updateUser.getPublicKey().toIotaAddress(),
      filter: {
        StructType: `${CREDIT_CARBON_MANAGER_PACKAGE}::minter_pass_nft::MinterPassNFT`,
      },
    });

    // console.log("proof: ", proof);

    if (!proof || proof.data.length === 0) {
      console.error("No proof found");
      return;
    }

    const firstNft = proof.data[0];

    const tx = new Transaction();

    tx.moveCall({
      package: CREDIT_CARBON_MANAGER_PACKAGE,
      module: "credit_carbon_manager",
      function: "update_credit_points",
      arguments: [
        tx.object(CREDIT_CARBON_TABLE_ADDRESS),
        tx.object(firstNft?.data?.objectId!),
        tx.pure.u64(25),
        tx.object(firstCap?.data?.objectId!),
      ],
    });

    const result = await iotaClient.signAndExecuteTransaction({
      signer: caller,
      transaction: tx,
    });

    console.log("credit_carbon_manager::update_credit_points result: ", result);
  }

  {
    const caller = otherKeypair;

    const receiverAddress = caller.getPublicKey().toIotaAddress();

    const proof = await iotaClient.getOwnedObjects({
      owner: caller.getPublicKey().toIotaAddress(),
      filter: {
        StructType: `${CREDIT_CARBON_MANAGER_PACKAGE}::minter_pass_nft::MinterPassNFT`,
      },
    });

    // console.log("proof: ", proof);

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
        tx.object(CREDIT_CARBON_TABLE_ADDRESS),
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

  {
    const caller = otherKeypair;

    const carbonCoins = await iotaClient.getCoins({
      owner: caller.getPublicKey().toIotaAddress(),
      coinType: `${CREDIT_CARBON_MANAGER_PACKAGE}::credit_token::CREDIT_TOKEN`,
    });

    console.log("carbonCoin: ", carbonCoins);
    if (!carbonCoins || carbonCoins.data.length === 0) {
      console.error("No carbon coins found");
      return;
    }

    // const [firstCoin, ...remains] = carbonCoins.data;

    const tx = new Transaction();

    // tx.mergeCoins(
    //   tx.object(
    //     Inputs.ObjectRef({
    //       objectId: firstCoin!.coinObjectId,
    //       version: firstCoin!.version,
    //       digest: firstCoin!.digest,
    //     })
    //   ),
    //   remains.map((coin) =>
    //     tx.object(
    //       Inputs.ObjectRef({
    //         objectId: coin.coinObjectId,
    //         version: coin.version,
    //         digest: coin.digest,
    //       })
    //     )
    //   )
    // );

    const coinFitBalance = carbonCoins.data.find(
      (coin) => BigInt(coin.balance) >= BigInt(3)
    );

    if (!coinFitBalance) {
      throw new Error("No carbon coins found");
    }

    const coin = tx.splitCoins(coinFitBalance!.coinObjectId, [
      tx.pure.u64(BigInt(3)),
    ]);

    // const coin = tx.splitCoins(
    //   tx.object(
    //     Inputs.ObjectRef({
    //       objectId: firstCoin!.coinObjectId,
    //       version: firstCoin!.version,
    //       digest: firstCoin!.digest,
    //     })
    //   ),
    //   [3]
    // );

    // tx.transferObjects(
    //   [coin.[0]],
    //   tx.pure.address(caller.getPublicKey().toIotaAddress())
    // );

    tx.moveCall({
      package: CREDIT_CARBON_MANAGER_PACKAGE,
      module: "credit_carbon_manager",
      function: "consume_credit_token",
      arguments: [tx.object(CREDIT_TOKEN_MANAGER_ADDRESS), coin],
      typeArguments: [
        `${CREDIT_CARBON_MANAGER_PACKAGE}::credit_token::CREDIT_TOKEN`,
      ],
    });

    const result = await iotaClient.signAndExecuteTransaction({
      signer: caller,
      transaction: tx,
    });
    console.log("credit_carbon_manager::consume_credit_token result: ", result);
  }
})();
