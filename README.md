# Deferred Token

### Objective

> Cooldown 시간 이후, 토큰을 상환받을 수 있는 권리를 가진 Wrapped 토큰 컨트랙트

### setup

#### 1. 패키지 설치

````shell
yarn install
````

#### 2. private key 세팅하기

(tasks 호출 시 필요) 배포된 컨트랙트와 상호작용할 계정의 private key를 세팅합니다. 
`.env.example` 파일을 `.env`로 복사한 후, `PRIVATE_KEY` 필드에 privatekey를 세팅해주시면 됩니다.

````shell
MNEMONIC="test test test test test test test test test test test junk"
PRIVATE_KEY="0x000000000000000"
````


### Explanation

기본적으로 ERC20 토큰 스펙을 준수하며, 아래 확장 기능을 추가하였습니다.

#### 1. 토큰 예치하기
토큰을 예치하여, DeferredToken 발행하기

* *c.f) 호출전에 token에 대해 approve를 수행해야 합니다. `token.approve(deferredToken, amount)`*
```solidity
function deposit(uint256 amount) external;
```

#### 2. 토큰 상환 요청하기
deferred token을 소각하고, 기존 토큰에 대해 상환 요청합니다.  Cooldown 기간 이후로 withdraw 호출하면 받을 수 있습니다. 
````solidity
function requestWithdrawal(uint256 amount) external returns (uint256 requestId);
````

#### 3. 상환 요청 조회하기

requestId를 통해 상환 요청 정보를 조회합니다.

````solidity
function withdrawalRequests(uint256 requestId) external view returns (WithdrawalRequest memory);

struct WithdrawalRequest {
    uint256 id;        // @dev 상환 요청 식별자, withdraw 시 parameter 로 활용
    uint256 amount;    // @dev 상환 요청 갯수
    uint256 requestTs; // @dev 상환 요청 시각, cooldown 시간 이후 호출 가능
    bool isClaimed;    // @dev 상환 여부
}
````

#### 4. 유저의 상환 요청 목록 조회하기
유저의 상환 요청에 대한 정보를 조회합니다. 만기 요청일 & 상환 받을 수 있는 갯수 등을 내려줍니다. 상환 시 목록에서 제거됩니다.

*c.f) 시간에 따른 정렬 순서는 보장하지 않습니다.(withdraw 시 정렬 순서 변경)*

````solidity
/// @notice 유저 별 상환 요청 갯수
function withdrawalRequestCounts(address owner) external view returns (uint256);

/// @notice 유저 별 상환 요청 정보로, index는 [0, withdrawalRequestCounts(owner) - 1)
function withdrawalRequestByIndex(address owner, uint256 index) external view returns (
    WithdrawalRequest memory
);
````

#### 5. 토큰 상환하기
상환하기. msg.sender로 토큰을 반환합니다  

````solidity
function withdraw(uint256 requestId) external;
````

#### 6. 쿨다운시간 변경하기 (onlyOwner)

상환 요청 이후 상환까지 필요한 최소 기간 변경. 변경 시 이전 요청들도 일괄 적용됩니다.
* 단위 : 초

````solidity
function setCoolDownPeriod(uint256 period) external;
````

#### 7. 정지 / 해제 하기 (onlyOwner)

일시정지 시, deposit / withdraw / requestWithdrawal / transfer가 정지합니다.

````solidity
function pause() external;
function unpause() external;
````
