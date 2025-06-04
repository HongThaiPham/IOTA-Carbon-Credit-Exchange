import { getExplorerUrl, truncateWallet } from "@/lib/utils";
import React from "react";
type Props = {
  addressOrTx: string;
};
const NetworkExplorerLink: React.FC<Props> = ({ addressOrTx }) => {
  return (
    <a
      href={getExplorerUrl(addressOrTx)}
      target="_blank"
      className="text-blue-500 flex items-center gap-1"
    >
      {addressOrTx.length > 66
        ? truncateWallet(addressOrTx, 50, true)
        : addressOrTx}
    </a>
  );
};

export default NetworkExplorerLink;
