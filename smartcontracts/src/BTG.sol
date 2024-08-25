// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DCCToken {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    uint256 public interestRate;
    address public owner;
    mapping(address => uint256) public balanceOf;
    address[] private _holders;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _interestRate,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        interestRate = _interestRate;
        totalSupply = _totalSupply;
        owner = msg.sender;
        balanceOf[owner] = _totalSupply;
        _holders.push(owner); // Initial holder is the contract owner
    }

    function mint(address to, uint256 amount) external onlyOwner returns (bool) {
        require(to != address(0), "Invalid address");
        totalSupply += amount;
        balanceOf[to] += amount;
        _holders.push(to);
        return true;
    }

    function holders() external view returns (address[] memory) {
        return _holders;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        // Add the recipient to the holders list if not already
        bool isHolder = false;
        for (uint256 i = 0; i < _holders.length; i++) {
            if (_holders[i] == to) {
                isHolder = true;
                break;
            }
        }
        if (!isHolder) {
            _holders.push(to);
        }

        return true;
    }

    function burn(uint256 amount) external onlyOwner returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance to burn");
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        return true;
    }
}

contract BTG {
    address public owner;

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
        uint256 interestRate,
        uint256 amount
    ) external onlyOwner returns (address) {
        DCCToken newDCC = new DCCToken(name, symbol, interestRate, amount);
        newDCC.mint(msg.sender, amount); // Mint initial tokens to the owner
        return address(newDCC);
    }

    // 2. Distributing yield (interest) to holders
    function distributeYield(address dccToken) external onlyOwner returns (bool) {
        DCCToken dcc = DCCToken(dccToken);
        address[] memory holders = dcc.holders();

        for (uint256 i = 0; i < holders.length; i++) {
            uint256 balance = dcc.balanceOf(holders[i]);
            uint256 interest = (balance * dcc.interestRate()) / 100;
            (bool ok, ) = holders[i].call{value: interest}("");
            require(ok, "Transfer failed");
        }
        return true;
    }

    // 3. Rescuing tokens at expiration time (repayment of principal)
    function rescueTokens(address dccToken) external onlyOwner returns (bool) {
        DCCToken dcc = DCCToken(dccToken);
        address[] memory holders = dcc.holders();

        for (uint256 i = 0; i < holders.length; i++) {
            uint256 balance = dcc.balanceOf(holders[i]);
            (bool ok, ) = holders[i].call{value: balance}("");
            require(ok, "Transfer failed");
        }
        return true;
    }

    // 4. Burning tokens after repayment of principal
    function burnTokens(address dccToken) external onlyOwner returns (bool) {
        DCCToken dcc = DCCToken(dccToken);
        address[] memory holders = dcc.holders();

        for (uint256 i = 0; i < holders.length; i++) {
            uint256 balance = dcc.balanceOf(holders[i]);
            dcc.burn(balance);
        }
        return true;
    }

    // Function to deposit ETH to the contract (for yield distribution)
    receive() external payable {}
}
