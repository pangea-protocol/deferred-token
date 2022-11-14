// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interfaces/IDeferredToken.sol";

/**
 * DeferredToken
 *
 * 일정 시간 이후, 토큰을 상환받을 수 있는 권리를 가진 Wrapped 토큰 컨트랙트
 *
 */
contract DeferredToken is
    ERC20PausableUpgradeable,
    OwnableUpgradeable,
    IDeferredToken {
    using SafeERC20 for IERC20Metadata;

    address public token;

    uint256 public cooldownPeriod;

    WithdrawalRequest[] public _withdrawalRequests;

    mapping(address => uint256) public _withdrawalRequestCounts;
    mapping(uint256 => address) public requestOwnerOf;
    mapping(address => mapping(uint256 => uint256)) private _ownedRequests;
    mapping(uint256 => uint256) private _ownedRequestsIndex;

    function initialize(address _token) external initializer {
        token = _token;
        string memory originalName = IERC20Metadata(_token).name();
        string memory originalSymbol = IERC20Metadata(_token).symbol();

        __ERC20_init(
            string(abi.encodePacked("Deferred ", originalName)),
            string(abi.encodePacked("D-", originalSymbol))
        );

        cooldownPeriod = 7 days;

        __Pausable_init();
        __ERC20Pausable_init();
        __Ownable_init();
    }

    function decimals() public view virtual override returns (uint8) {
        return IERC20Metadata(token).decimals();
    }

    /// @notice 상환 요청 정보
    function withdrawalRequests(uint256 requestId) external view returns (WithdrawalRequest memory) {
        return _withdrawalRequests[requestId];
    }

    /// @notice 유저 별 상환 요청 갯수
    function withdrawalRequestCounts(address owner) external view returns (uint256) {
        return _withdrawalRequestCounts[owner];
    }

    /// @notice 유저 별 상환 요청 정보 가져오기,
    /// @param owner 상환 요청한 유저의 주소
    /// @param index 0 ~ withdrawalRequestCounts(owner) - 1의 값
    function withdrawalRequestByIndex(address owner, uint256 index) external view returns (WithdrawalRequest memory) {
        uint256 requestId = _ownedRequests[owner][index];
        return _withdrawalRequests[requestId];
    }

    /// @notice 토큰을 예치하여, deferredToken 발행
    /// @param amount 예치할 토큰의 양
    /// @dev 호출 전, token에 대해 approve을 수행해야 합니다.
    function deposit(uint256 amount) external whenNotPaused {
        require(amount > 0, "NOT_ZERO");

        IERC20Metadata(token).safeTransferFrom(
            msg.sender,
            address(this),
            amount
        );
        _mint(msg.sender, amount);

        emit Deposit(msg.sender, amount);
    }

    /// @notice 토큰에 대해 상환 요청. cooldown 기간 이후로 withdraw 호출하면 받을 수 있음.
    /// @param amount 예치할 토큰의 양
    /// @dev 호출 후, deferredToken은 소각됩니다.
    function requestWithdrawal(
        uint256 amount
    ) external whenNotPaused returns (uint256 requestId) {
        require(amount > 0, "NOT_ZERO");
        require(amount <= balanceOf(msg.sender), "INSUFFICIENT_BALANCE");

        _burn(msg.sender, amount);

        requestId = openRequest(msg.sender, amount);

        emit RequestWithdrawal(msg.sender, amount, requestId);
    }

    /// @notice 토큰에 대해 상환 수행하기
    /// @param requestId 상환 요청 식별자
    /// @param amount 상환받은 토큰 갯수
    /// @dev cooldownPeriod가 지나간 후 호출이 가능합니다.
    function withdraw(
        uint256 requestId
    ) external whenNotPaused returns (uint256 amount) {
        WithdrawalRequest memory request = _withdrawalRequests[requestId];
        require(!request.isClaimed, "ALREADY_CLAIMED");
        require(requestOwnerOf[requestId] == msg.sender, "NOT_OWNER");
        require(
            request.requestTs + cooldownPeriod <= block.timestamp,
            "NEED_COOLDOWN"
        );
        amount = request.amount;

        IERC20Metadata(token).safeTransfer(msg.sender, amount);

        closeRequest(msg.sender, requestId);

        emit Withdraw(msg.sender, amount, requestId);
    }

    function openRequest(
        address owner,
        uint256 amount
    ) internal returns (uint256 requestId) {
        requestId = _withdrawalRequests.length;
        _withdrawalRequests.push(
            WithdrawalRequest(requestId, amount, block.timestamp, false)
        );

        uint256 count = _withdrawalRequestCounts[owner]++;

        requestOwnerOf[requestId] = owner;
        _ownedRequests[owner][count] = requestId;
        _ownedRequestsIndex[requestId] = count;
    }

    function closeRequest(address owner, uint256 requestId) internal {
        _withdrawalRequests[requestId].isClaimed = true;

        uint256 lastRequestIndex = --_withdrawalRequestCounts[owner];
        uint256 requestIndex = _ownedRequestsIndex[requestId];

        if (requestIndex != lastRequestIndex) {
            uint256 lastRequestId = _ownedRequests[owner][lastRequestIndex];

            _ownedRequests[owner][requestIndex] = lastRequestId;
            _ownedRequestsIndex[lastRequestId] = requestIndex;
        }

        delete _ownedRequestsIndex[requestIndex];
        delete _ownedRequests[owner][lastRequestIndex];
    }

    /// @notice 쿨다운 기간 변경하기
    /// @param period 쿨다운 기간 (unit: seconds)
    function setCooldownPeriod(uint256 period) external onlyOwner {
        cooldownPeriod = period;

        emit UpdateCooldownPeriod(period);
    }

    /// @notice deposit, requestWithdrawal, withdraw, transfer 일시정지하기 (only Owner)
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice 일시정지 해제 (only Owner)
    function unpause() external onlyOwner {
        _unpause();
    }
}
