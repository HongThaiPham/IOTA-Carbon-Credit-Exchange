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
      variables,
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables,
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
