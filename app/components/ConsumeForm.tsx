"use client";
import React from "react";

import { Loader2, SendIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useConsumeToken from "@/hooks/useConsumeToken";
import { toast } from "sonner";

const ConsumeForm = () => {
  const [amount, setAmount] = React.useState<number>(0);
  const { mutateAsync, isPending } = useConsumeToken();
  const handler = async () => {
    if (amount <= 0) {
      return;
    }

    toast.promise(mutateAsync(amount), {
      loading: `Retiring ${amount} Carbon Token...`,
      success: () => {
        setAmount(0);
        return `Successfully retired ${amount} Carbon Token!`;
      },
      error: (err) => {
        return `Failed to retire Carbon Token: ${
          err instanceof Error ? err.message : "Unknown error"
        }`;
      },
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <Label>
        Amount to retire{" "}
        <span className="text-sm text-gray-500">
          (You can only retire the amount you have)
        </span>
      </Label>
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full max-w-xs"
      />
      <div className="flex justify-start">
        <Button disabled={isPending} onClick={handler}>
          {isPending ? (
            <Loader2 className="animate-spin size-3" />
          ) : (
            <SendIcon className="size-3" />
          )}
          Retire
        </Button>
      </div>
    </div>
  );
};

export default ConsumeForm;
