"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpdateDataWeb2 from "@/hooks/useUpdateDataWeb2";
import { Loader2, SaveIcon } from "lucide-react";
import React from "react";
type Props = {
  id: string;
  value: number;
};
const TableCellEditAmount: React.FC<Props> = ({ id, value }) => {
  const [amount, setAmount] = React.useState(value);
  const { mutateAsync, isPending } = useUpdateDataWeb2(id);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setAmount(0);
    } else {
      const parsedValue = parseInt(newValue);
      if (!isNaN(parsedValue)) {
        setAmount(parsedValue);
      }
    }
  };
  const handleSave = async () => {
    if (amount !== value) {
      await mutateAsync(amount);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={amount}
        className="w-24"
        onChange={handleChange}
      />
      <Button onClick={handleSave} disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : <SaveIcon />}
        <span className="sr-only">Save</span>
      </Button>
    </div>
  );
};

export default TableCellEditAmount;
