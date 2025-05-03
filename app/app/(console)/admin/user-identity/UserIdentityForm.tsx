"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OrgSelect from "./OrgSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuotaIdentity } from "../../_actions/quota.action";
import { toast } from "react-toastify";
import { Loader2, SaveIcon } from "lucide-react";
import { isValidIotaAddress } from "@iota/iota-sdk/utils";
const formSchema = z.object({
  id: z.string(),
  wallet: z.string(),
  mint: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const UserIdentityForm = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["user-identity"],
    mutationFn: async (data: FormSchemaType) => {
      await toast.promise(updateQuotaIdentity(data.id, data.wallet), {
        pending: "Updating user identity...",
        success: "User identity updated successfully",
        error: "Failed to update user identity",
      });
    },
  });
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      wallet: "",
      mint: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    // Validate the wallet address
    if (!isValidIotaAddress(values.wallet)) {
      form.setError("wallet", {
        type: "manual",
        message: "Invalid wallet address",
      });
      return;
    }

    mutate(values);
    form.reset();
    queryClient.invalidateQueries({
      queryKey: ["rwaTokenCreated"],
    });
    console.log("Form submitted", values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={() => (
            <FormItem>
              <FormLabel>ORG ID</FormLabel>
              <FormControl>
                <OrgSelect />
              </FormControl>
              <FormDescription>
                This is the ORG ID of the organization you are working with.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter wallet address"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the wallet address you will be using.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <SaveIcon className="mr-2" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default UserIdentityForm;
