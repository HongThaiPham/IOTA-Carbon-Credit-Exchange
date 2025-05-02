"use client";
import supabaseClient from "@/lib/supabase.client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { updateQuotaOnchain } from "../(console)/_actions/quota.action";
const queryClient = new QueryClient();
export default function Web2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const chanel = supabaseClient
      .channel("quota-update")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "credit-quota" },
        async (payload) => {
          console.log("Change received!", payload);
          if (payload.new) {
            const { org_id, credit_amount, wallet } = payload.new;
            const message = `Quota updated for ${org_id} to ${credit_amount} with wallet ${wallet}`;
            console.log(message);
            await updateQuotaOnchain(wallet, credit_amount);
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(chanel);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer />
    </QueryClientProvider>
  );
}
