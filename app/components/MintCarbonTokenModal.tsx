"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2, SendIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import useMintCarbonToken from "@/hooks/useMintCarbonToken";
import { toast } from "sonner";
import { useCurrentAccount } from "@iota/dapp-kit";

const formSchema = z.object({
  to: z.string(),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
});

type FormSchemaType = z.infer<typeof formSchema>;

type Props = {
  nftObjectId?: string;
};

const MintCarbonTokenModal: React.FC<Props> = ({ nftObjectId }) => {
  const [open, setOpen] = React.useState(false);
  const currentAccount = useCurrentAccount();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: currentAccount?.address,
      amount: 0,
    },
  });
  const { mutateAsync: mintCarbonToken, isPending } = useMintCarbonToken(
    nftObjectId!
  );

  function onSubmit(values: FormSchemaType) {
    toast.promise(mintCarbonToken({ to: values.to, amount: values.amount }), {
      loading: "Issuing Carbon Token...",
      success: () => {
        form.reset();
        setOpen(false);
        return `Carbon Token issued to ${values.to}`;
      },
      error: (err) => {
        return `Error issuing Carbon Token: ${err.message}`;
      },
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <SendIcon className="mr-2" />
          Mint Carbon Token
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to issue a Minter NFT?
          </DialogTitle>
          <DialogDescription>
            This will issue a Minter NFT to the selected address.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Receiver address" {...field} />
                    </FormControl>
                    <FormDescription>
                      This address will receive the Carbon Token.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Amount of Carbon Token"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the amount of Carbon Token to mint.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 animate-spin" />
                ) : (
                  <SendIcon className="mr-2" />
                )}{" "}
                Issue
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MintCarbonTokenModal;
