import { insertHistory } from "@/app/(console)/_actions/history.action";
import { useNetworkVariable } from "@/lib/networkConfig";
import { useIotaClient, useSignAndExecuteTransaction } from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMintCarbonToken(nftObjectId: string) {
  const iotaClient = useIotaClient();
  const carbonManagerPackageId = useNetworkVariable("carbonManagerPackageId");
  const creditTokenManagerAddress = useNetworkVariable(
    "creditTokenManagerAddress"
  );
  const creditTableAddress = useNetworkVariable("creditTableAddress");

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
    mutationKey: ["mintCarbonToken"],
    mutationFn: async ({ to, amount }: { to: string; amount: number }) => {
      const tx = new Transaction();

      tx.moveCall({
        target: `${carbonManagerPackageId}::credit_carbon_manager::mint_credit_token`,
        arguments: [
          tx.object(creditTableAddress as string),
          tx.object(creditTokenManagerAddress as string),
          tx.object(nftObjectId),
          tx.pure.u64(amount),
          tx.pure.address(to),
        ],
        typeArguments: [
          `${carbonManagerPackageId}::credit_token::CREDIT_TOKEN`,
        ],
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

      await insertHistory(result.digest, amount.toString(), "MINT");

      await queryClient.invalidateQueries({
        queryKey: ["transactionHistory", "MINT"],
      });

      return result;
    },
  });
}
