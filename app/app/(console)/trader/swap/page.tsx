import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DatabaseZapIcon } from "lucide-react";
import React from "react";

const SwapPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DatabaseZapIcon className="mr-2" />
          Carbon Token Trading
        </CardTitle>
        <CardDescription>
          This page use for trading carbon tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          This page is currently under construction. You can use any DEX in IOTA
          to trade carbon tokens.
        </p>
        <p>
          If you have any questions or need assistance, please contact support.
        </p>
      </CardContent>
    </Card>
  );
};

export default SwapPage;
