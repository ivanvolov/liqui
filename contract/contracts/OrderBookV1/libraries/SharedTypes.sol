// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

library SharedTypes {
    struct Order {
        address owner;
        uint templateId;
        uint[] params;
        uint amount0;
        uint amount1;
        bool isValid;
        uint deadline;
    }
}
