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

export const getExplorerUrl = (id?: string, network: string = "mainnet") => {
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


export function truncateWallet(
  str: string,
  num: number,
  middle: boolean = false,
  maskChar: string = "."
) {
  if (str.length > num && str.length > 3) {
    if (!middle) {
      return `${str.substring(0, num)}${maskChar.repeat(3)}`;
    }

    const a = Math.round((num * 2) / 3);
    const b = num - a;

    return `${str.substring(0, a)}${maskChar.repeat(3)}${str.substring(
      str.length - b,
      str.length
    )}`;
  }

  return str;
}