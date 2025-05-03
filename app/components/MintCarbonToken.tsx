"use client";
import { MINTER_NFT_TYPE } from "@/lib/constants";
import { useCurrentAccount, useIotaClientQuery } from "@iota/dapp-kit";
import { Loader2 } from "lucide-react";
import React, { useMemo } from "react";
import MintCarbonTokenModal from "./MintCarbonTokenModal";

const MintCarbonToken = () => {
  const currentAccount = useCurrentAccount();
  const { data, isPending } = useIotaClientQuery(
    "getOwnedObjects",
    {
      owner: currentAccount?.address as string,
      filter: {
        StructType: MINTER_NFT_TYPE,
      },
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!currentAccount?.address,
    }
  );

  const firstMinterNft = useMemo(() => {
    if (data?.data && data?.data?.length > 0) {
      return data?.data[0].data;
    }
    return null;
  }, [data]);
  return (
    <div>
      MintCarbonToken
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div>
          {firstMinterNft ? (
            <MintCarbonTokenModal nftObjectId={firstMinterNft.objectId} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MintCarbonToken;
