import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  isValidIotaAddress,
  isValidTransactionDigest,
} from "@iota/iota-sdk/utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringCompact = (address?: string, chars = 4) => {
  if (!address) {
    return "";
  }
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const getExplorerUrl = (id?: string, network: string = "testnet") => {
  if (!id) {
    return "";
  }
  const path = isValidIotaAddress(id)
    ? "address"
    : isValidTransactionDigest(id)
    ? "txblock"
    : "object";
  if (network === "testnet") {
    return `https://explorer.rebased.iota.org/${path}/${id}?network=testnet`;
  }
  return `https://explorer.rebased.iota.org/${path}/${id}`;
};
