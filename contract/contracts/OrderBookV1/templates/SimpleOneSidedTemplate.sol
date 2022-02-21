// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '../interfaces/IOrderTemplate.sol';
import '../libraries/SharedTypes.sol';

contract SimpleOneSidedTemplate is IOrderTemplate {

    using SafeMath for uint;
    
    // Params description
    // [order type (0/1); curveLength; ...curveLength x; ...curveLength p]
    //
    function getPrice(uint q, address token, SharedTypes.Order memory order, address token0, address token1) external override pure returns (uint price) {
        require(order.params[0] == 0 && token == token0 || order.params[0] == 1 && token == token1, 'SimpleOneSidedTemplate: TOKEN is not valid');
        
        uint curveLength = order.params[1];
        for (int i = int(curveLength-1); i >= 0; i--) {            
            uint x_i = order.params[uint(2+i)];

            // If one of the curve pivot points was hit.
            if(q == x_i) return order.params[2+curveLength+uint(i)];

            if (q > x_i) {
                require(uint(i) != curveLength-1, 'SimpleOneSidedTemplate: The requested value is greater than the curve');
                uint x_ii = order.params[3+uint(i)];
                uint p_i = order.params[2+curveLength+uint(i)];
                uint p_ii = order.params[3+curveLength+uint(i)];

                price = (p_ii-p_i)*(q-x_i)/(x_ii-x_i) + p_i;
                // TODO: multiplier
                return price;
            }
        }
        revert("SimpleOneSidedTemplate: The requested value is less than the curve");
    }
}