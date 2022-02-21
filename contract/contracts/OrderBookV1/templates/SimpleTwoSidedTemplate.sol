// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '../interfaces/IOrderTemplate.sol';
import '../libraries/SharedTypes.sol';

contract SimpleTwoSidedTemplate is IOrderTemplate {

    using SafeMath for uint;
    
    // Params description
    // [curveLength; ...curveLength x0; ...curveLength p0; ...curveLength x1; ...curveLength p1]
    //
    function getPrice(uint q, address token, SharedTypes.Order memory order, address token0, address token1) external override pure returns (uint price) {
        require(token == token0 || token == token1, 'Pair: Invalid token pair');
        uint curveLength = order.params[0];

        uint start = token == token0 ? 1: curveLength * 2 + 1;
        for (int i = int(curveLength)-1; i>=0; i--) {
            uint x_i = order.params[start+uint(i)];

            if(q == x_i) return order.params[start+curveLength+uint(i)];

            if (q > x_i) {
                require(uint(i) != curveLength-1, 'SimpleTwoSidedTemplate: The requested value is greater than the curve');
                
                uint x_ii = order.params[start+uint(i)+1];
                uint p_i = order.params[start+curveLength+uint(i)];
                uint p_ii = order.params[start+curveLength+uint(i)+1];

                price = (p_ii-p_i)*(q-x_i)/(x_ii-x_i) + p_i;
                // TODO: multiplier
                return price;
            }
        }
        revert("SimpleTwoSidedTemplate: The requested value is less than the curve");
    }
}