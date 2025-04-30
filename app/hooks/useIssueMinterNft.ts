import { useNetworkVariable } from "@/lib/networkConfig";
import { useIotaClient, useSignAndExecuteTransaction } from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import { useMutation } from "@tanstack/react-query";


export default function useIssueMinterNft() {
    const iotaClient = useIotaClient();
    const carbonManagerPackageId = useNetworkVariable("carbonManagerPackageId");
    const minterPassConfigAddress = useNetworkVariable("minterPassConfigAddress");

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
    })

    return useMutation({
        mutationKey: ["issueMinterNft"],
        mutationFn: async (to: string) => {
            const tx = new Transaction();

            tx.moveCall({
                target: `${carbonManagerPackageId}::credit_carbon_manager::issue_minter_pass_nft`,
                arguments: [
                    tx.object(minterPassConfigAddress as string),
                    tx.pure.string(
                        "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg"
                    ),
                    tx.pure.address(to),
                ],
            })

            return signAndExecute(
                {
                    transaction: tx,
                },
                {
                    onSuccess: async () => {
                        console.log("Transaction executed successfully");
                    },
                },
            );
        }
    })


}