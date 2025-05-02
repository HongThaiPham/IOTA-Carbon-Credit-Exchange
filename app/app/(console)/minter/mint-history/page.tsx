import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryIcon } from "lucide-react";
import React from "react";

const MintHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HistoryIcon className="h-5 w-5" /> Mint transaction history
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* <HistoryTable type="MINT" /> */}
      </CardContent>
    </Card>
  );
};

export default MintHistory;
