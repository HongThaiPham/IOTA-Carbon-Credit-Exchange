"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import useIssueMinterNft from "@/hooks/useIssueMinterNft";
import { toast } from "sonner";
import { Loader2, SendIcon } from "lucide-react";

const formSchema = z.object({
  to: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const IssueMinterNftModal = () => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: issueMinterNft, isPending } = useIssueMinterNft();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
    },
  });

  function onSubmit(values: FormSchemaType) {
    toast.promise(issueMinterNft(values.to), {
      loading: "Issuing Minter NFT...",
      success: () => {
        form.reset();
        setOpen(false);
        return `Minter NFT issued to ${values.to}`;
      },
      error: (err) => {
        return `Error issuing Minter NFT: ${err.message}`;
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Issue Minter NFT</Button>
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
                      This address will receive the Minter NFT.
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

export default IssueMinterNftModal;
