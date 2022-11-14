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

    WithdrawalRequest[] public withdrawalRequests;

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

    function withdrawalRequestCounts(address owner) external view returns (uint256) {
        return _withdrawalRequestCounts[owner];
    }

    function withdrawalRequestByIndex(address owner, uint256 index) external view returns (WithdrawalRequest memory) {
        uint256 requestId = _ownedRequests[owner][index];
        return withdrawalRequests[requestId];
    }

    function deposit(uint256 amount) external whenNotPaused {
        IERC20Metadata(token).safeTransferFrom(
            msg.sender,
            address(this),
            amount
        );
        _mint(msg.sender, amount);

        emit Deposit(msg.sender, amount);
    }

    function requestWithdrawal(
        uint256 amount
    ) external whenNotPaused returns (uint256 requestId) {
        _burn(msg.sender, amount);

        requestId = openRequest(msg.sender, amount);

        emit RequestWithdrawal(msg.sender, amount, requestId);
    }

    function withdraw(
        uint256 requestId
    ) external whenNotPaused returns (uint256 amount) {
        WithdrawalRequest memory request = withdrawalRequests[requestId];
        require(!request.isClaimed, "ALREADY CLAIMED");
        require(requestOwnerOf[requestId] == msg.sender, "NOT OWNER");
        require(
            request.requestTs + cooldownPeriod <= block.timestamp,
            "NEED COOLDOWN"
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
        requestId = withdrawalRequests.length;
        withdrawalRequests.push(
            WithdrawalRequest(requestId, amount, block.timestamp, false)
        );

        uint256 count = _withdrawalRequestCounts[owner]++;

        requestOwnerOf[requestId] = owner;
        _ownedRequests[owner][count] = requestId;
        _ownedRequestsIndex[requestId] = count;
    }

    function closeRequest(address owner, uint256 requestId) internal {
        withdrawalRequests[requestId].isClaimed = true;

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

    function setCooldownPeriod(uint256 period) external onlyOwner {
        cooldownPeriod = period;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
