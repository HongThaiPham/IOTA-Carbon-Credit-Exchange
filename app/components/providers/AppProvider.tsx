"use client";
import { networkConfig } from "@/lib/networkConfig";
import { IotaClientProvider, WalletProvider } from "@iota/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import AppThemeProvider from "./AppThemeProvider";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../AppSidebar";

const queryClient = new QueryClient();

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <IotaClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </WalletProvider>
        </IotaClientProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
