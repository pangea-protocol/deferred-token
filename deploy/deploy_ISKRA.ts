import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BigNumber } from "ethers";
import {
  IERC20Metadata,
  IERC20Metadata__factory,
  Token__factory,
} from "../types";

const deployFunction: DeployFunction = async function ({
  ethers,
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  let token: IERC20Metadata;
  if (network.name == "hardhat") {
    const result = await deploy("Token", {
      from: deployer,
      args: ["ISKRA TOKEN", "ISK", 18],
    });
    // for test
    const user = await ethers.getNamedSigner("user");
    await Token__factory.connect(result.address, user).mint(
      user.address,
      ethers.utils.parseEther("100000000000")
    );

    token = Token__factory.connect(result.address, ethers.provider);
  } else if (network.name == "baobab") {
    token = IERC20Metadata__factory.connect(
      "0xf9a2b15870C89B0965174225087B630387331C1c",
      ethers.provider
    );
  } else if (network.name == "cypress") {
    token = IERC20Metadata__factory.connect(
      "0x17d2628d30f8e9e966c9ba831c9b9b01ea8ea75c",
      ethers.provider
    );
  } else {
    throw new Error("TOKEN ADDRESS NOT DETERMINED");
  }

  await deploy("DeferredISK", {
    contract: "DeferredToken",
    from: deployer,
    proxy: {
      owner: dev,
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [token.address],
        },
      },
    },
    log: true,
    waitConfirmations: network.name == "hardhat" ? 0 : 2,
    gasPrice: BigNumber.from("250000000000"),
  });
};

export default deployFunction;
