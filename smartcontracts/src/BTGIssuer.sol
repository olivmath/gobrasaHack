// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DCCToken} from "./DCCToken.sol";

contract BTGIssuer {
    address public owner;
    address[] public createdTokens;

    event DCCCreated(address indexed tokenAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createDCC(
        string memory name,
        string memory symbol,
        string memory description,
        string memory ipfsCID,
        uint256 interestRate,
        uint256 amount
    ) external onlyOwner returns (address) {
        DCCToken newDCC = new DCCToken(
            name,
            symbol,
            description,
            ipfsCID,
            amount,
            interestRate
        );

        createdTokens.push(address(newDCC));

        emit DCCCreated(address(newDCC));

        return address(newDCC);
    }

    function getCreatedTokensCount() external view returns (uint256) {
        return createdTokens.length;
    }

    function getAllCreatedTokens() external view returns (address[] memory) {
        return createdTokens;
    }

    function getLastCreatedToken() external view returns (address) {
        require(createdTokens.length > 0, "No tokens have been created yet");
        return createdTokens[createdTokens.length - 1];
    }
}
