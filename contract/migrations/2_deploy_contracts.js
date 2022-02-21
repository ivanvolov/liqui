/* eslint-disable no-undef */
const Registry = artifacts.require("Registry");
const Pair = artifacts.require("Pair");
const SimpleOneSidedTemplate = artifacts.require("SimpleOneSidedTemplate");
const SimpleTwoSidedTemplate = artifacts.require("SimpleTwoSidedTemplate");

module.exports = function (deployer) {
  deployer.deploy(Registry);
  deployer.deploy(Pair);
  deployer.deploy(SimpleTwoSidedTemplate);
  deployer.deploy(SimpleOneSidedTemplate);
};
