"use client";
import { networkConfig } from "@/lib/networkConfig";
import { IotaClientProvider, WalletProvider } from "@iota/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import AppThemeProvider from "./AppThemeProvider";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../AppSidebar";
import { Toaster } from "../ui/sonner";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <IotaClientProvider
          networks={networkConfig}
          defaultNetwork={
            process.env.NEXT_PUBLIC_NETWORK === "mainnet"
              ? "mainnet"
              : "testnet"
          }
        >
          <WalletProvider autoConnect>
            <Toaster richColors position="bottom-right" />

            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
            <ToastContainer />
          </WalletProvider>
        </IotaClientProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
