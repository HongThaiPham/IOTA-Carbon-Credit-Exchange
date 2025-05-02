import { MINTER_NFT_TYPE } from "@/lib/constants";
import { useIotaClientQuery } from "@iota/dapp-kit";
import { useQuery } from "@tanstack/react-query";

export default function useMinterNft(address: string) {
  const { data } = useIotaClientQuery(
    "getOwnedObjects",
    {
      owner: address,
      filter: {
        StructType: MINTER_NFT_TYPE,
      },
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!address,
    }
  );
  return useQuery({
    queryKey: ["get-minter-nft", address],
    queryFn: async () => {
      if (!data || data.data.length === 0) {
        return null;
      }
      const [firstNft] = data.data;
      return firstNft.data;
    },
  });
}
