// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./ERC20.sol";

contract DCCToken is ERC20 {
    string private _name;
    string private _symbol;
    string public description;
    string public ipfsCID;
    uint256 private _totalSupply;
    uint256 public interestRate;
    address owner;

    mapping(address => bool) private _holders;
    address[] private _allHolders;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_,
        string memory description_,
        string memory ipfsCID_,
        uint256 interestRate_
    ) {
        _name = name_;
        _symbol = symbol_;
        description = description_;
        ipfsCID = ipfsCID_;
        interestRate = interestRate_;
        owner = msg.sender;

        _mint(owner, totalSupply_);
        _totalSupply = totalSupply_;
        _addHolder(owner);
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        bool success = super.transfer(to, amount);
        if (success) {
            _addHolder(to);
        }
        return success;
    }

    function _addHolder(address holder) internal {
        if (!_holders[holder]) {
            _holders[holder] = true;
            _allHolders.push(holder);
        }
    }

    function allHolders() public view returns (address[] memory) {
        return _allHolders;
    }

    function calculateInterest(address holder) public view returns (uint256) {
        uint256 balance = balanceOf(holder);
        return (balance * interestRate) / 100;
    }

    function issuerOwnershipPercentage() public view returns (uint256) {
        uint256 issuerBalance = balanceOf(owner);
        return (issuerBalance * 100) / _totalSupply;
    }
}
