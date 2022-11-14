import { ContractTransaction, utils } from "ethers";
import {
  DeferredToken,
  IERC20Metadata,
  IERC20Metadata__factory,
} from "../types";
import Table from "cli-table3";
import { formatUnits } from "ethers/lib/utils";

export async function waitTx(
  transaction: Promise<ContractTransaction>,
  desc = ""
) {
  const tx = await transaction;
  const hre = require("hardhat");
  const chainId = await hre.getChainId();
  const receipt = await tx.wait(
    chainId === "31337" || chainId === "203" ? 0 : 2
  );
  console.log(
    `\n Transaction Desc : ${desc} \n - transaction hash : ${receipt.transactionHash}\n`
  );
}

export async function connectedWallet(ethers, network) {
  const user = await ethers.getNamedSigner("user");
  console.log(
    `- connected wallet : ${user.address} \n- connected network : ${network.name}`
  );
  return user;
}

export async function loadContracts(ethers, user) {
  const deferredToken = (await ethers.getContract(
    "DeferredISK",
    user
  )) as DeferredToken;

  const token = IERC20Metadata__factory.connect(
    await deferredToken.token(),
    user
  );
  return {
    deferredToken,
    token,
  };
}

export async function parseAmount(token, amount) {
  const decimals = await token.decimals();
  return utils.parseUnits(amount, decimals);
}

export async function formatAmount(token, amount) {
  const decimals = await token.decimals();
  return utils.formatUnits(amount, decimals);
}

export async function showInfo(deferredToken) {
  const [token, name, symbol, decimals, cooldown, totalSupply, paused, owner] =
    await Promise.all([
      deferredToken.token(),
      deferredToken.name(),
      deferredToken.symbol(),
      deferredToken.decimals(),
      deferredToken.cooldownPeriod(),
      deferredToken.totalSupply(),
      deferredToken.paused(),
      deferredToken.owner(),
    ]);

  console.log("DeferredToken 정보 >");

  const table = new Table({});
  table.push(
    { address: deferredToken.address },
    { token },
    { name },
    { symbol },
    { decimals },
    { cooldown: cooldown.toString() + " s" },
    { totalSupply: utils.formatUnits(totalSupply, decimals) },
    { paused },
    { manager: owner }
  );

  console.log(table.toString());
}

export async function showBalance(owner, deferredToken, token) {
  const deferredBalance = await deferredToken.balanceOf(owner);
  const balance = await token.balanceOf(owner);

  const table = new Table({});
  console.log("유저 자산 보유");
  table.push(
    {
      "deferred ISKRA": await formatAmount(token, deferredBalance),
    },
    {
      ISKRA: await formatAmount(token, balance),
    }
  );

  console.log(table.toString());
}

export async function showWithdrawalRequest(
  owner,
  deferredToken: DeferredToken,
  token: IERC20Metadata
) {
  console.log("상환 요청 목록");
  const table = new Table({
    head: ["requestId", "amount", "요청일시", "상환가능여부"],
  });
  const counts = await deferredToken.withdrawalRequestCounts(owner);
  const decimals = await token.decimals();
  const cooldown = await deferredToken.cooldownPeriod();

  const currentTs = (await token.provider.getBlock("latest")).timestamp;
  for (let i = 0; i < counts.toNumber(); i++) {
    const request = await deferredToken.withdrawalRequestByIndex(owner, i);

    table.push([
      request.id.toNumber(),
      formatUnits(request.amount, decimals),
      new Date(request.requestTs.toNumber() * 1000).toUTCString(),
      request.requestTs.add(cooldown).lte(currentTs),
    ]);
  }
  console.log(table.toString());
}
