"use client";

import HistoryTable from "@/components/HistoryTable";
import MintCarbonTokenModal from "@/components/MintCarbonTokenModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMinterNft from "@/hooks/useMinterNft";
import { useCurrentAccount } from "@iota/dapp-kit";
import { BadgePlusIcon, HistoryIcon } from "lucide-react";
import React from "react";

const MintTokenPage = () => {
  const currentAccount = useCurrentAccount();
  const { data } = useMinterNft(currentAccount?.address as string);
  if (!currentAccount?.address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgePlusIcon className="h-5 w-5" /> Mint more Carbon Credit Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          Please connect your wallet to mint carbon credit token.
        </CardContent>
      </Card>
    );
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgePlusIcon className="h-5 w-5" /> Mint more Carbon Credit Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data?.objectId ? (
            <MintCarbonTokenModal nftObjectId={data?.objectId} />
          ) : (
            "You don't have any minter NFT. Please request one first."
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" /> Mint transaction history
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <HistoryTable type="MINT" />
        </CardContent>
      </Card>
    </>
  );
};

export default MintTokenPage;
