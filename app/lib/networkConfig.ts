import { getFullnodeUrl } from "@iota/iota-sdk/client";

import { createNetworkConfig } from "@iota/dapp-kit";
import {
  CREDIT_CARBON_MANAGER_PACKAGE,
  MINTER_PASS_CONFIG_ADDRESS,
  CREDIT_TOKEN_MANAGER_ADDRESS,
  CREDIT_CARBON_TABLE_ADDRESS,
} from "./constants";

const variables = {
  carbonManagerPackageId: CREDIT_CARBON_MANAGER_PACKAGE,
  minterPassConfigAddress: MINTER_PASS_CONFIG_ADDRESS,
  creditTokenManagerAddress: CREDIT_TOKEN_MANAGER_ADDRESS,
  creditTableAddress: CREDIT_CARBON_TABLE_ADDRESS,
};

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables,
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        carbonManagerPackageId: "0xbed892ac4bd5e15d184493e850e669e07dada810c3a15c5cce66fc16d9adf504",
        minterPassConfigAddress: "0xc3dcf411ed53805da9e907b02336e47397be17ed272714853973a091a9962104",
        creditTokenManagerAddress: "0x02b84bc04eadec4bab5946faf0cb4bf0666a65e0441d96d3f5a7c53b58aecab3",
        creditTableAddress: "0x29cdd8f025fca0c50f0120a78764a7f17c3397decb0d470c44d0995ebf67fd16",
      },
    },
    mainnet: {
      url: "https://api.mainnet.iota.cafe",
      variables,
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
