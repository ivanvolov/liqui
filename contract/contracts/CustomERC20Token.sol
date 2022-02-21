// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomERC20Token is ERC20 {
    constructor (string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        // _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

    function unlimitedMint(address sender_address, uint amount) public {
        _mint(sender_address, amount * 10 ** uint(decimals()));
    }

    function getBlockchainParams() public view returns(uint) {
        return block.timestamp;
    }
}