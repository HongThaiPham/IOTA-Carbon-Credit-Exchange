import { getFullnodeUrl } from "@iota/iota-sdk/client";

import { createNetworkConfig } from "@iota/dapp-kit";
const CREDIT_CARBON_MANAGER_PACKAGE =
  process.env.NEXT_PUBLIC_CREDIT_CARBON_MANAGER_PACKAGE;
const MINTER_PASS_CONFIG_ADDRESS =
  process.env.NEXT_PUBLIC_MINTER_PASS_CONFIG_ADDRESS;
const CREDIT_TOKEN_MANAGER_ADDRESS =
  process.env.NEXT_PUBLIC_CREDIT_TOKEN_MANAGER_ADDRESS;

const variables = {
  carbonManagerPackageId: CREDIT_CARBON_MANAGER_PACKAGE,
  minterPassConfigAddress: MINTER_PASS_CONFIG_ADDRESS,
  creditTokenManagerAddress: CREDIT_TOKEN_MANAGER_ADDRESS,
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
