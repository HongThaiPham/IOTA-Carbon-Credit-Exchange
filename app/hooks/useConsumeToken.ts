import { insertHistory } from "@/app/(console)/_actions/history.action";
import { CARBON_TOKEN_TYPE } from "@/lib/constants";
import { useNetworkVariable } from "@/lib/networkConfig";
import {
  useCurrentAccount,
  useIotaClient,
  useSignAndExecuteTransaction,
} from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useConsumeToken() {
  const iotaClient = useIotaClient();
  const currentAccount = useCurrentAccount();
  const carbonManagerPackageId = useNetworkVariable("carbonManagerPackageId");
  const creditTokenManagerAddress = useNetworkVariable(
    "creditTokenManagerAddress"
  );
  const queryClient = useQueryClient();

  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await iotaClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  return useMutation({
    mutationKey: ["consume_token"],
    mutationFn: async (amount: number) => {
      const tx = new Transaction();
      if (!currentAccount) {
        throw new Error("No current account");
      }
      console.log("currentAccount", currentAccount.address);
      const carbonCoins = await iotaClient.getCoins({
        owner: currentAccount.address,
        coinType: CARBON_TOKEN_TYPE,
      });

      console.log("carbonCoins", carbonCoins);

      const coinWithEnoughAmount = carbonCoins.data.find(
        (coin) => BigInt(coin.balance) >= BigInt(amount)
      );

      if (!coinWithEnoughAmount) {
        throw new Error("No carbon coins found");
      }

      const coin = tx.splitCoins(coinWithEnoughAmount.coinObjectId, [
        tx.pure.u64(amount),
      ]);

      // tx.transferObjects([coin], tx.pure.address(currentAccount?.address));

      tx.moveCall({
        target: `${carbonManagerPackageId}::credit_carbon_manager::consume_credit_token`,
        arguments: [tx.object(creditTokenManagerAddress as string), coin],
        typeArguments: [CARBON_TOKEN_TYPE],
      });

      const result = await signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: async () => {
            console.log("Transaction executed successfully");
          },
        }
      );

      await insertHistory(result.digest, amount.toString(), "RETIRE");

      await queryClient.invalidateQueries({
        queryKey: ["transactionHistory", "RETIRE"],
      });
    },
  });
}
