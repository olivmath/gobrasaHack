// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DCCToken} from "./DCCToken.sol";

contract BTGIssuer {
    address public owner;

    event DCCCreated(address tokenAddress);

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
        string memory ipfsLink,
        uint256 interestRate,
        uint256 amount
    ) external onlyOwner returns (address) {
        DCCToken newDCC = new DCCToken(
            name,
            symbol,
            amount,
            description,
            ipfsLink,
            interestRate
        );

        emit DCCCreated(address(newDCC));

        return address(newDCC);
    }
}
