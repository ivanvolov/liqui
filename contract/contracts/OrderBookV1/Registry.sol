// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import './Pair.sol';
import './templates/SimpleTwoSidedTemplate.sol';
import './templates/SimpleOneSidedTemplate.sol';

contract Registry {
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
    
    constructor() {
        address oneSidedTemplate = address(new SimpleOneSidedTemplate());
        createTemplate(oneSidedTemplate);

        address twoSidedTemplate = address(new SimpleTwoSidedTemplate());
        createTemplate(twoSidedTemplate);
    }

    function createPair(address token0, address token1) external returns (address) {
        require(token0 != token1, 'Registry: IDENTICAL_ADDRESSES');
        require(token0 != address(0), 'Registry: ZERO_ADDRESS');
        require(token1 != address(0), 'Registry: ZERO_ADDRESS');
        
        require(getPair[token0][token1] == address(0), 'Registry: PAIR_EXISTS');
        
        address pair = address(new Pair());
        Pair(pair).initialize(token0, token1);

        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        
        return pair;
    }

    struct Template {
        address owner;
        address template;
    }

    Template[] public orderTemplates;

    function allTemplatesLength() external view returns (uint) {
        return orderTemplates.length;
    }

    function getTemplateAddress(uint _id) public view returns (address) {
        return orderTemplates[_id].template;
    }

    function createTemplate(address template) public {
        Template memory newTemplate = Template(msg.sender, template);
        orderTemplates.push(newTemplate);
    }
}