// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import '../libraries/SharedTypes.sol';

interface IOrderTemplate {
  function getPrice(uint q, address token, SharedTypes.Order memory order, address token0, address token1) external pure returns (uint);
}