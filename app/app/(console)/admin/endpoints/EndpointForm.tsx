"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAddNewEndpoint from "@/hooks/useAddNewEndpoint";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SendIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
const formSchema = z.object({
  url: z.string().url(),
  apiKey: z.string().optional(),
  accountId: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const EndpointForm = () => {
  const { mutateAsync, isPending } = useAddNewEndpoint();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      apiKey: "",
      accountId: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    try {
      await mutateAsync({
        url: values.url,
        apiKey: values.apiKey ?? "",
        accountId: values.accountId ?? "",
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registry API Endpoint</FormLabel>
              <FormControl>
                <Input placeholder="The URL endpoint for get data" {...field} />
              </FormControl>
              <FormDescription>
                This is the URL endpoint for the registry API. It should be a
                valid URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <Input placeholder="Your API key" {...field} />
              </FormControl>
              <FormDescription>
                This is your API key for authentication.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account ID</FormLabel>
              <FormControl>
                <Input placeholder="Your account ID" {...field} />
              </FormControl>
              <FormDescription>
                This is your account ID for the registry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default EndpointForm;
