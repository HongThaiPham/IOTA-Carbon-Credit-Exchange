"use client";
import { networkConfig } from "@/lib/networkConfig";
import { IotaClientProvider, WalletProvider } from "@iota/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>{children}</WalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
