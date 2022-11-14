import { task } from "hardhat/config";
import {
  connectedWallet,
  formatAmount,
  loadContracts,
  parseAmount,
  showBalance,
  showInfo,
  showWithdrawalRequest,
  waitTx,
} from "./utils";

/**
 * defered ISKRA 토큰에 대한 주요 Interaction 정의
 *
 * prerequisite
 * [1] 패키지 설치하기
 * > yarn install
 *
 * [2] interaction할 PRIVATE_KEY 세팅하기
 * .env 파일을 패키지 루트에 생성 후, PRIVATE_KEY="0x<PRIVATE_KEY>"를 세팅해주세요
 *
 * 주요 태스크
 *
 * [1] deferred 토큰 정보 조회
 * > yarn hardhat iskra:info
 *
 * [2] deferred 토큰 예치하기
 * > yarn hardhat iskra:deposit <amount>
 *
 * [3] deferred 토큰 상환 요청하기
 * > yarn hardhat iskra:requestWithdrawal <amount>
 *
 * [4] deferred 토큰 상환 요청 목록 조회하기
 * > yarn hardhat iskra:requests <owner, 미지정 시 USER>
 *
 * [5] deferred 토큰 상환하기
 * > yarn hardhat iskra:withdraw <requestId>
 *
 * [6] deferred 토큰의 cooldown 기간 변경하기
 * > yarn hardhat iskra:setCooldownPeriod <period>
 *
 * [7] deferred 토큰 정지/ 해제하기
 * > yarn hardhat iskra:pause
 * > yarn hardhat iskra:unpause
 */

task("iskra:info", "deferredISK 토큰 정보 조회").setAction(
  async ({}, { ethers, network }) => {
    const user = await connectedWallet(ethers, network);

    const { deferredToken } = await loadContracts(ethers, user);

    await showInfo(deferredToken);
  }
);

task("iskra:deposit", "ISKRA 토큰을 예치하여, deferredToken 생성")
  .addPositionalParam("amount", "예치할 토큰 갯수", "1")
  .setAction(async ({ amount }, { ethers, network }) => {
    const user = await connectedWallet(ethers, network);

    const { deferredToken, token } = await loadContracts(ethers, user);
    amount = await parseAmount(token, amount);
    const allowance = await token.allowance(
      user.address,
      deferredToken.address
    );
    if (allowance.lt(amount)) {
      await waitTx(
        token.approve(deferredToken.address, ethers.constants.MaxUint256),
        "deferredToken으로의 Approve 수행"
      );
    }

    await waitTx(
      deferredToken.deposit(amount),
      `${await formatAmount(token, amount)} 만큼 예치`
    );

    console.log("호출 후 결과 > \n");
    await showBalance(user.address, deferredToken, token);
  });

task("iskra:requestWithdrawal", "deferredToken에 대해 상환 요청 수행하기")
  .addPositionalParam("amount", "상환 요청할 토큰 갯수", "1")
  .setAction(async ({ amount }, { ethers, network }) => {
    const user = await connectedWallet(ethers, network);

    const { deferredToken, token } = await loadContracts(ethers, user);
    amount = await parseAmount(token, amount);

    await waitTx(
      deferredToken.requestWithdrawal(amount),
      `${await formatAmount(token, amount)} 만큼 출금 요청`
    );

    console.log("호출 후 결과 > \n");
    await showBalance(user.address, deferredToken, token);
    await showWithdrawalRequest(user.address, deferredToken, token);
  });

task("iskra:requests", "deferredToken에 대해 상환 요청 목록 조회하기")
  .addPositionalParam("owner", "조회할 계정 주소(미지정 시, user 계정)", "")
  .setAction(async ({ owner }, { ethers, network }) => {
    const user = await connectedWallet(ethers, network);
    if (owner == "") owner = user.address;

    const { deferredToken, token } = await loadContracts(ethers, user);

    await showWithdrawalRequest(owner, deferredToken, token);
  });

task("iskra:withdraw", "상환하기")
  .addPositionalParam("requestId", "상환 요청 식별자", "1")
  .setAction(async ({ requestId }, { ethers, network }) => {
    const user = await connectedWallet(ethers, network);

    const { deferredToken, token } = await loadContracts(ethers, user);

    await waitTx(
      deferredToken.withdraw(requestId),
      `ID: ${requestId} 상환 수행`
    );

    console.log("호출 후 결과 > \n");
    await showBalance(user.address, deferredToken, token);
    await showWithdrawalRequest(user.address, deferredToken, token);
  });

task("iskra:setCooldownPeriod", "deferredToken에 대해 쿨다운 요청하기")
  .addPositionalParam("period", "cooldown period(단위 초)", "1")
  .setAction(async ({ period }, { ethers, network }) => {
    const user = await connectedWallet(ethers, network);

    const { deferredToken } = await loadContracts(ethers, user);

    await waitTx(
      deferredToken.setCooldownPeriod(period),
      `CoolDown 기간 변경 수행`
    );

    console.log("호출 후 결과 > \n");
    await showInfo(deferredToken);
  });

task("iskra:pause", "PAUSE 요청").setAction(async ({}, { ethers, network }) => {
  const user = await connectedWallet(ethers, network);

  const { deferredToken } = await loadContracts(ethers, user);

  await waitTx(deferredToken.pause(), `PAUSE 요청 `);

  console.log("호출 후 결과 > \n");
  await showInfo(deferredToken);
});

task("iskra:unpause", "PAUSE 해제").setAction(
  async ({}, { ethers, network }) => {
    const user = await connectedWallet(ethers, network);

    const { deferredToken } = await loadContracts(ethers, user);

    await waitTx(deferredToken.unpause(), `PAUSE 요청`);

    console.log("호출 후 결과 > \n");
    await showInfo(deferredToken);
  }
);
