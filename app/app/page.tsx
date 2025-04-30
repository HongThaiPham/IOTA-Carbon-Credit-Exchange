"use client";
import IssueMinterNftModal from "@/components/IssueMinterNftModal";
import { ConnectButton } from "@iota/dapp-kit";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ConnectButton />
      <IssueMinterNftModal />
    </div>
  );
}
