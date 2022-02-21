// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import './Registry.sol';
import './interfaces/IOrderTemplate.sol';
import './libraries/SharedTypes.sol';

contract Pair {
    using SafeMath for uint;

    address public token0;
    address public token1;
    address public registry;

    SharedTypes.Order[] public orders;

    uint public lastPrice;

    function allOrdersLength() external view returns (uint) {
        return orders.length;
    }

    constructor() {
        registry = msg.sender;
    }

    function initialize(address _token0, address _token1) external {
        require(msg.sender == registry, 'Pair: FORBIDDEN');
        token0 = _token0;
        token1 = _token1;
    }

    function getOrderParams(uint _id) public view returns (uint[] memory) {
        return orders[_id].params;
    }

    function swap(uint orderId, uint q, address token, uint minSellingPrice) public {
        SharedTypes.Order memory order = orders[orderId];
        require(token == token0 || token == token1, 'Pair: Invalid token pair');
        require(int(order.deadline) > int(block.timestamp), 'Pair: Deadline is not valid');
        require(order.isValid == true, 'Pair: Order is not valid');

        uint256 allowance = ERC20(token).allowance(msg.sender, address(this));
        require(allowance >= q, 'Pair: allowance is not enough');

        address templateAddress = Registry(registry).getTemplateAddress(order.templateId);
        uint sellingPrice = IOrderTemplate(templateAddress).getPrice(q, token, order, token0, token1);
        require(sellingPrice > minSellingPrice, 'Pair: Slippage is reached');
        
        if(token == token0) {
            require(sellingPrice <= orders[orderId].amount1, 'Pair: Not enogth liquidity');

            ERC20(token0).transferFrom(msg.sender, address(this), q);
            orders[orderId].amount0 += q;

            ERC20(token1).transfer(msg.sender, sellingPrice);
            orders[orderId].amount1 -= sellingPrice;
        }
        else if(token == token1){
            require(sellingPrice <= orders[orderId].amount0, 'Pair: Not enogth liquidity');

            ERC20(token1).transferFrom(msg.sender, address(this), q);
            orders[orderId].amount1 += q;

            ERC20(token0).transfer(msg.sender, sellingPrice);
            orders[orderId].amount0 -= sellingPrice;
        }

        lastPrice = sellingPrice / q; //TODO: Set clever Math here
    }
    
    function placeOrder(uint templateId, uint[] memory params, uint deadline) public {        
        require(int(deadline) > int(block.timestamp), 'Pair: Deadline is not valid');
        require(templateId < Registry(registry).allTemplatesLength(), 'Pair: Template is not defined');
        
        SharedTypes.Order memory newOrder = SharedTypes.Order(msg.sender, templateId, params, 0, 0, true, deadline);
        orders.push(newOrder);
    }

    function provideLiquidity(address token, uint amount, uint orderId) public{
        require(orders[orderId].owner == msg.sender, 'Pair: Is not an order owner');

        if(token == token0) {
            uint256 allowance = ERC20(token0).allowance(msg.sender, address(this));
            require(allowance >= amount, 'Pair: Allowance is not enough');
            ERC20(token0).transferFrom(msg.sender, address(this), amount);
            orders[orderId].amount0 += amount;
        }
        else if(token == token1){
            uint256 allowance = ERC20(token1).allowance(msg.sender, address(this));
            require(allowance >= amount, 'Pair: Allowance is not enough');
            ERC20(token1).transferFrom(msg.sender, address(this), amount);
            orders[orderId].amount1 += amount;
        } else {
            revert('Pair: Invalid token pair');
        }
    }

    function removeLiquidity(address token, uint amount, uint orderId) public{
        require(orders[orderId].owner == msg.sender, 'Pair: Is not an order owner');

        if(token == token0) {
            require(orders[orderId].amount0 >= amount, 'Pair: The amount is to large');
            ERC20(token0).transfer(msg.sender, amount);
            orders[orderId].amount0 -= amount;
        }
        else if(token == token1){
            require(orders[orderId].amount1 >= amount, 'Pair: The amount is to large');
            ERC20(token1).transfer(msg.sender, amount);
            orders[orderId].amount1 -= amount;
        } else {
            revert('Pair: Invalid token pair');
        }
    }

    function cancelOrder(uint orderId) public{
        require(orders[orderId].owner == msg.sender, 'Pair: Is not an order owner');
        orders[orderId].isValid = false;
        
        ERC20(token0).transfer(address(msg.sender), orders[orderId].amount0);
        ERC20(token1).transfer(address(msg.sender), orders[orderId].amount1);
    }
}
