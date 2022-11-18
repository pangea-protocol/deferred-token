import { ethers, network } from "hardhat";
import { DeferredToken, Token } from "../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

describe("STAKING UNIT TEST", async () => {
  let _snapshotId: string;

  let deployer: SignerWithAddress;
  let manager: SignerWithAddress;
  let user0: SignerWithAddress;
  let user1: SignerWithAddress;

  let token: Token;
  let deferredToken: DeferredToken;

  let snapshotId: string;

  before("", async () => {
    _snapshotId = await ethers.provider.send("evm_snapshot", []);

    [deployer, manager, user0, user1] = await ethers.getSigners();

    /**
     * DEPLOY
     */
    token = (await (
      await ethers.getContractFactory("Token")
    ).deploy("TEST TOKEN", "TETO", 18)) as Token;

    deferredToken = (await (
      await ethers.getContractFactory("DeferredToken")
    ).deploy()) as DeferredToken;

    await deferredToken.initialize(token.address);
    await deferredToken.transferOwnership(manager.address);

    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  afterEach(async () => {
    await network.provider.send("evm_revert", [snapshotId]);
    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  after(async () => {
    await network.provider.send("evm_revert", [_snapshotId]);
    _snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  async function jumpDays(days: number, mine = true) {
    await network.provider.send("evm_increaseTime", [86400 * days]);
    if (mine) {
      await network.provider.send("evm_mine", []);
    }
  }

  async function jumpToNextBlockTimestamp(time: number, mine = true) {
    await network.provider.send("evm_setNextBlockTimestamp", [time]);
    if (mine) {
      await network.provider.send("evm_mine", []);
    }
  }

  describe("token metadata TEST", async () => {
    it("check name / symbol / decimals", async () => {
      const givenName = "HELLO TOKEN";
      const givenSymbol = "HETO";
      const decimals = 8;

      const token = (await (
        await ethers.getContractFactory("Token")
      ).deploy(givenName, givenSymbol, decimals)) as Token;

      const deferredToken = (await (
        await ethers.getContractFactory("DeferredToken")
      ).deploy()) as DeferredToken;

      await deferredToken.initialize(token.address);

      expect(await deferredToken.name()).to.be.eq("Deferred " + givenName);
      expect(await deferredToken.symbol()).to.be.eq("D-" + givenSymbol);
      expect(await deferredToken.decimals()).to.be.eq(decimals);
    });
  });

  describe("deposit TEST", async () => {
    beforeEach("", async () => {
      await token.mint(manager.address, ethers.utils.parseEther("1000000"));
    });

    it("revert: amount = 0", async () => {
      await expect(deferredToken.deposit(0)).to.be.revertedWith("NOT_ZERO");
    });

    it("deposit successfully", async () => {
      const amount = ethers.utils.parseEther("1000");
      await token
        .connect(manager)
        .approve(deferredToken.address, ethers.constants.MaxUint256);

      await deferredToken.connect(manager).deposit(amount);

      expect(await deferredToken.balanceOf(manager.address)).to.be.eq(amount);
      expect(await deferredToken.totalSupply()).to.be.eq(amount);
    });

    it("deposit multiple successfully", async () => {
      const amount0 = ethers.utils.parseEther("1000");
      const amount1 = ethers.utils.parseEther("2000");
      await token
        .connect(manager)
        .approve(deferredToken.address, ethers.constants.MaxUint256);

      await deferredToken.connect(manager).deposit(amount0);
      await deferredToken.connect(manager).deposit(amount1);

      expect(await deferredToken.balanceOf(manager.address)).to.be.eq(
        amount0.add(amount1)
      );
      expect(await deferredToken.totalSupply()).to.be.eq(amount0.add(amount1));
    });
  });

  describe("requestWithdrawal TEST", async () => {
    beforeEach("", async () => {
      await token.mint(user0.address, ethers.utils.parseEther("1000000"));
      await token.mint(user1.address, ethers.utils.parseEther("1000000"));
      await token
        .connect(user0)
        .approve(deferredToken.address, ethers.constants.MaxUint256);
      await token
        .connect(user1)
        .approve(deferredToken.address, ethers.constants.MaxUint256);
    });

    it("revert: amount = 0", async () => {
      await expect(
        deferredToken.connect(user0).requestWithdrawal(0)
      ).to.be.revertedWith("NOT_ZERO");
    });

    it("revert: balance insufficient", async () => {
      const givenAmount = ethers.utils.parseEther("100");
      await deferredToken.connect(user0).deposit(givenAmount);

      await expect(
        deferredToken.connect(user0).requestWithdrawal(givenAmount.add(1))
      ).to.be.revertedWith("INSUFFICIENT_BALANCE");
    });

    it("request successfully", async () => {
      const givenAmount = ethers.utils.parseEther("100");
      await deferredToken.connect(user0).deposit(givenAmount);

      await deferredToken.connect(user0).requestWithdrawal(givenAmount);

      expect(await deferredToken.balanceOf(user0.address)).to.be.eq(0);
      expect(
        await deferredToken.withdrawalRequestCounts(user0.address)
      ).to.be.eq(1);

      const request = await deferredToken.withdrawalRequestByIndex(
        user0.address,
        0
      );
      expect(request.id).to.be.eq(0);
      expect(request.amount).to.be.eq(givenAmount);
      expect(await deferredToken.requestOwnerOf(request.id)).to.be.eq(
        user0.address
      );
    });

    it("request multiple successfully", async () => {
      const depositAmount = ethers.utils.parseEther("300");
      const givenAmount0 = ethers.utils.parseEther("100");
      const givenAmount1 = ethers.utils.parseEther("150");
      await deferredToken.connect(user0).deposit(depositAmount);

      await deferredToken.connect(user0).requestWithdrawal(givenAmount0);
      await deferredToken.connect(user0).requestWithdrawal(givenAmount1);

      expect(await deferredToken.balanceOf(user0.address)).to.be.eq(
        depositAmount.sub(givenAmount0).sub(givenAmount1)
      );
      expect(
        await deferredToken.withdrawalRequestCounts(user0.address)
      ).to.be.eq(2);

      const request0 = await deferredToken.withdrawalRequestByIndex(
        user0.address,
        0
      );
      expect(request0.id).to.be.eq(0);
      expect(request0.amount).to.be.eq(givenAmount0);
      expect(await deferredToken.requestOwnerOf(request0.id)).to.be.eq(
        user0.address
      );

      const request1 = await deferredToken.withdrawalRequestByIndex(
        user0.address,
        1
      );
      expect(request1.id).to.be.eq(1);
      expect(request1.amount).to.be.eq(givenAmount1);
      expect(await deferredToken.requestOwnerOf(request1.id)).to.be.eq(
        user0.address
      );
    });
  });

  describe("withdraw TEST", async () => {
    beforeEach("", async () => {
      await token.mint(user0.address, ethers.utils.parseEther("500"));
      await token.mint(user1.address, ethers.utils.parseEther("500"));
      await token
        .connect(user0)
        .approve(deferredToken.address, ethers.constants.MaxUint256);
      await token
        .connect(user1)
        .approve(deferredToken.address, ethers.constants.MaxUint256);

      await deferredToken
        .connect(user0)
        .deposit(ethers.utils.parseEther("500"));
      await deferredToken
        .connect(user1)
        .deposit(ethers.utils.parseEther("500"));

      await deferredToken
        .connect(user1)
        .requestWithdrawal(ethers.utils.parseEther("100"));
      await deferredToken
        .connect(user1)
        .requestWithdrawal(ethers.utils.parseEther("100"));
      await deferredToken
        .connect(user1)
        .requestWithdrawal(ethers.utils.parseEther("100"));

      await deferredToken
        .connect(user0)
        .requestWithdrawal(ethers.utils.parseEther("100"));
      await jumpDays(1, false);
      await deferredToken
        .connect(user0)
        .requestWithdrawal(ethers.utils.parseEther("100"));
      await jumpDays(1, false);
      await deferredToken
        .connect(user0)
        .requestWithdrawal(ethers.utils.parseEther("100"));
      await jumpDays(1, false);
      await deferredToken
        .connect(user0)
        .requestWithdrawal(ethers.utils.parseEther("100"));
      await jumpDays(1, false);
      await deferredToken
        .connect(user0)
        .requestWithdrawal(ethers.utils.parseEther("100"));
      await jumpDays(1, false);
    });

    it("revert: NOT OWNER", async () => {
      await expect(deferredToken.connect(user1).withdraw(0)).to.be.revertedWith(
        "NOT_OWNER"
      );
    });

    it("revert: before cooldown", async () => {
      await expect(deferredToken.connect(user0).withdraw(0)).to.be.revertedWith(
        "NEED_COOLDOWN"
      );
    });

    it("revert: withdraw duplicate", async () => {
      const period = await deferredToken.cooldownPeriod();
      const requestTs = (await deferredToken.withdrawalRequests(0)).requestTs;
      await jumpToNextBlockTimestamp(requestTs.add(period).toNumber());

      await deferredToken.connect(user0).withdraw(0);

      await expect(deferredToken.connect(user0).withdraw(0)).to.be.revertedWith(
        "ALREADY_CLAIMED"
      );
    });

    it("withdraw id = 0", async () => {
      const requestId = 1;

      const period = await deferredToken.cooldownPeriod();
      const request = await deferredToken.withdrawalRequests(requestId);
      await jumpToNextBlockTimestamp(request.requestTs.add(period).toNumber());

      await deferredToken.connect(user0).withdraw(requestId);

      expect(
        await deferredToken.withdrawalRequestCounts(user0.address)
      ).to.be.eq(4);
      expect(await token.balanceOf(user0.address)).to.be.eq(request.amount);
    });

    it("withdraw id = 1", async () => {
      const requestId = 1;

      const period = await deferredToken.cooldownPeriod();
      const request = await deferredToken.withdrawalRequests(requestId);
      await jumpToNextBlockTimestamp(request.requestTs.add(period).toNumber());

      await deferredToken.connect(user0).withdraw(requestId);

      expect(
        await deferredToken.withdrawalRequestCounts(user0.address)
      ).to.be.eq(4);
      expect(await token.balanceOf(user0.address)).to.be.eq(request.amount);
    });

    it("withdraw id = 1, 3", async () => {
      const period = await deferredToken.cooldownPeriod();
      const requestTs = (await deferredToken.withdrawalRequests(3)).requestTs;
      await jumpToNextBlockTimestamp(requestTs.add(period).toNumber());

      await deferredToken.connect(user0).withdraw(1);
      await deferredToken.connect(user0).withdraw(3);

      expect(
        await deferredToken.withdrawalRequestCounts(user0.address)
      ).to.be.eq(3);
      expect(await token.balanceOf(user0.address)).to.be.eq(
        ethers.utils.parseEther("200")
      );
    });

    it("withdraw id = 3, 1", async () => {
      const period = await deferredToken.cooldownPeriod();
      const requestTs = (await deferredToken.withdrawalRequests(3)).requestTs;
      await jumpToNextBlockTimestamp(requestTs.add(period).toNumber());

      await deferredToken.connect(user0).withdraw(3);
      await deferredToken.connect(user0).withdraw(1);

      expect(
        await deferredToken.withdrawalRequestCounts(user0.address)
      ).to.be.eq(3);
      expect(await token.balanceOf(user0.address)).to.be.eq(
        ethers.utils.parseEther("200")
      );
    });

    it("withdraw id = 2, 4", async () => {
      const period = await deferredToken.cooldownPeriod();
      const requestTs = (await deferredToken.withdrawalRequests(4)).requestTs;
      await jumpToNextBlockTimestamp(requestTs.add(period).toNumber());

      await deferredToken.connect(user0).withdraw(2);
      await deferredToken.connect(user0).withdraw(4);

      expect(
        await deferredToken.withdrawalRequestCounts(user0.address)
      ).to.be.eq(3);
      expect(await token.balanceOf(user0.address)).to.be.eq(
        ethers.utils.parseEther("200")
      );
    });

    it("withdraw All", async () => {
      await jumpDays(100, false);

      await deferredToken.connect(user1).withdraw(2);
      await deferredToken.connect(user1).withdraw(1);
      await deferredToken.connect(user1).withdraw(0);
      await deferredToken.connect(user0).withdraw(7);
      await deferredToken.connect(user0).withdraw(6);
      await deferredToken.connect(user0).withdraw(5);
      await deferredToken.connect(user0).withdraw(4);
      await deferredToken.connect(user0).withdraw(3);

      expect(
        await deferredToken.withdrawalRequestCounts(user0.address)
      ).to.be.eq(0);
      expect(await token.balanceOf(user0.address)).to.be.eq(
        ethers.utils.parseEther("500")
      );

      expect(
        await deferredToken.withdrawalRequestCounts(user1.address)
      ).to.be.eq(0);
      expect(await token.balanceOf(user1.address)).to.be.eq(
        ethers.utils.parseEther("300")
      );
    });
  });

  describe("setCooldownPeriod TEST", async () => {
    it("after update Cooldown period", async () => {
      await deferredToken.connect(manager).setCooldownPeriod(1000);
      expect(await deferredToken.cooldownPeriod()).to.be.eq(1000);
    });
  });

  describe("pause TEST", async () => {
    it("pause check", async () => {
      await deferredToken.connect(manager).pause();

      await expect(deferredToken.deposit(1)).to.be.revertedWith(
        "Pausable: paused"
      );
      await expect(deferredToken.withdraw(1)).to.be.revertedWith(
        "Pausable: paused"
      );
      await expect(deferredToken.requestWithdrawal(1)).to.be.revertedWith(
        "Pausable: paused"
      );
    });
  });
});
