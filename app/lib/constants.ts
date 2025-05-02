export const MINTER_NFT_TYPE = `${process.env.NEXT_PUBLIC_CREDIT_CARBON_MANAGER_PACKAGE}::minter_pass_nft::MinterPassNFT`;

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
