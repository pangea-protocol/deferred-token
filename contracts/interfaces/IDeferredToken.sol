/// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

interface IDeferredTokenEvent {
    /// @dev 예치 시 호출
    event Deposit(address indexed owner, uint256 amount);

    /// @dev 인출 요청 시 호출
    event RequestWithdrawal(
        address indexed owner,
        uint256 amount,
        uint256 requestId
    );

    /// @dev 인출 시 호출
    event Withdraw(address indexed owner, uint256 amount, uint256 requestId);
}

interface IDeferredTokenStruct {
    /// @dev 인출 요청
    struct WithdrawalRequest {
        uint256 id;
        uint256 amount;
        uint256 requestTs;
        bool isClaimed;
    }
}

interface IDeferredToken is IDeferredTokenStruct, IDeferredTokenEvent {

    /// @notice 상환 요청 정보
    function withdrawalRequests(uint256 requestId) external view returns (WithdrawalRequest memory);

    /// @notice 유저 별 상환 요청 갯수
    function withdrawalRequestCounts(address owner) external view returns (uint256);

    /// @notice 유저 별 상환 요청 정보로, index는 [0, withdrawalRequestCounts(owner) - 1)
    /// @dev sorting된 상태가 아님
    function withdrawalRequestByIndex(address owner, uint256 index) external view returns (WithdrawalRequest memory);

    /// @notice amount의 토큰을 예치하여, DefferedToken을 amount만큼 발행
    /// @dev 호
    function deposit(uint256 amount) external;

    /// @notice amount 만큼의 토큰에 대해 인출 요청. cooldown 기간 이후로 withdraw 호출하면 받을 수 있음.
    function requestWithdrawal(uint256 amount) external returns (uint256);

    /// @notice requestId에 대한 인출 요청 수행하기
    function withdraw(uint256 requestId) external returns (uint256);

    /// @notice 쿨다운 기간 변경하기 (only Owner)
    function setCooldownPeriod(uint256 period) external;

    /// @notice deposit, requestWithdrawal, withdraw, transfer 일시정지하기 (only Owner)
    function pause() external;

    /// @notice 일시정지 해제 (only Owner)
    function unpause() external;
}
