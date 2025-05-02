export const CREDIT_CARBON_MANAGER_PACKAGE = process.env
  .NEXT_PUBLIC_CREDIT_CARBON_MANAGER_PACKAGE as string;
export const MINTER_PASS_CONFIG_ADDRESS = process.env
  .NEXT_PUBLIC_MINTER_PASS_CONFIG_ADDRESS as string;
export const CREDIT_TOKEN_MANAGER_ADDRESS = process.env
  .NEXT_PUBLIC_CREDIT_TOKEN_MANAGER_ADDRESS as string;
export const MINTER_NFT_TYPE = `${CREDIT_CARBON_MANAGER_PACKAGE}::minter_pass_nft::MinterPassNFT`;
export const CREDIT_POINT_UPDATE_CAP_TYPE = `${CREDIT_CARBON_MANAGER_PACKAGE}::minter_pass_nft::CreditPointUpdateCap`;

export const CARBON_TOKEN_TYPE = `0x2::coin::Coin<${CREDIT_CARBON_MANAGER_PACKAGE}::credit_token::CREDIT_TOKEN>`;

import { NavbarItemType } from "@/types/Navbar.type";

export const NAVBAR_ITEMS: NavbarItemType[] = [
  {
    label: "Admin",
    link: "/admin",
  },
  {
    label: "Minter",
    link: "/minter",
  },
  {
    label: "Consumer",
    link: "/consumer",
  },
];
