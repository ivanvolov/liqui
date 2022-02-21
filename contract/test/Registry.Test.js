// /* eslint-disable no-undef */
const Registry = artifacts.require("Registry");
const CustomERC20Token = artifacts.require("CustomERC20Token");

contract("Registry", (accounts) => {
  let registryInstance;
  let tokenA;
  let tokenB;

  it("Set Up Tests", async () => {
    registryInstance = await Registry.deployed();
    tokenA = await CustomERC20Token.new("My Token A", "TKNA", {
      from: accounts[3],
    });
    tokenB = await CustomERC20Token.new("My Token B", "TKNB", {
      from: accounts[3],
    });

    const length = await registryInstance.allTemplatesLength();
    assert.equal(parseInt(length), 2, "This test should not fail");
  });

  it("Add template", async () => {
    await registryInstance.createTemplate(accounts[4]);

    const length = await registryInstance.allTemplatesLength();
    assert.equal(parseInt(length), 3, "This test should not fail");

    const template = await registryInstance.getTemplateAddress(2);
    assert.equal(template, accounts[4], "This test should not fail");
  });

  it("Create pair", async () => {
    let length = await registryInstance.allPairsLength();
    assert.equal(parseInt(length), 0, "This test should not fail");

    await registryInstance.createPair(tokenA.address, tokenB.address);

    length = await registryInstance.allPairsLength();
    assert.equal(parseInt(length), 1, "This test should not fail");
  });

  it("Fail to Create pair", async () => {
    try {
      await registryInstance.createPair(tokenA.address, tokenB.address);
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert Registry: PAIR_EXISTS -- Reason given: Registry: PAIR_EXISTS."
      );
    }
  });
});
