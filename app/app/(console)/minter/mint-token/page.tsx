"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BadgePlusIcon } from "lucide-react";
import React from "react";

const MintTokenPage = () => {
  // const [mint, setMint] = React.useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgePlusIcon className="h-5 w-5" /> Mint more Carbon Credit Token
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label className="text-sm font-medium">
          Select the mint address of the token you want to mint
        </Label>
        {/* <SelectMinterController onChange={setMint} />

        {mint ? <MintInfo address={mint} /> : null} */}
      </CardContent>
    </Card>
  );
};

export default MintTokenPage;
