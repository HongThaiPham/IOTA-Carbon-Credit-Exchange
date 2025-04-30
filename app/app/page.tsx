'use client';
import IssueMinterNft from "@/components/IssueMinterNft";
import { ConnectButton } from "@iota/dapp-kit";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ConnectButton/>
      <IssueMinterNft />
    </div>
  );
}
