import "dotenv/config";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "hardhat-interface-generator";
import "hardhat-abi-exporter";
import "hardhat-spdx-license-identifier";
import "hardhat-tracer";
import "@primitivefi/hardhat-dodoc";
import "@nomiclabs/hardhat-ethers";
import "solidity-coverage";

import { HardhatUserConfig } from "hardhat/config";

const accounts = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test junk",
};

const config: HardhatUserConfig = {
  defaultNetwork: process.env.NETWORK ? process.env.NETWORK : "localhost",
  gasReporter: {
    currency: "ETH",
    gasPrice: 250,
    enabled: true,
  },
  networks: {
    hardhat: {
      tags: ["test", "local"],
      gasPrice: 250000000000,
      accounts,
      // Solidity-coverage overrides gasPrice to 1 which is not compatible with EIP1559
      hardfork: process.env.CODE_COVERAGE ? "berlin" : "london",
    },
    baobab: {
      chainId: 1001,
      url: "https://baobab.ken.stick.us/",
      accounts,
      gasPrice: 250000000000,
    },
    cypress: {
      chainId: 8217,
      url: "https://internal.ken.stick.us",
      accounts,
      gasPrice: 250000000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      default: 1,
    },
    holder: {
      default: 2,
    },
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
    ],
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  dodoc: {
    runOnCompile: false,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  mocha: {
    timeout: 300000,
  },
  abiExporter: {
    path: "deployments/abis",
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
export default config;
