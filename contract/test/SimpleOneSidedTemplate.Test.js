/* eslint-disable no-undef */
const SimpleOneSidedTemplate = artifacts.require("SimpleOneSidedTemplate");
const { Token, _Token } = require("./helpers");

const curve = [
  ...[Token(1, 1), Token(4000), Token(6000), Token(8000)],
  ...[Token(10000, 1), Token(20000), Token(30000), Token(40000)],
];

const order = {
  owner: undefined,
  templateId: 0,
  params: [0, 4, ...curve],
  isValid: true,
  deadline: 0,
  amount0: 0,
  amount1: 0,
};

contract("SimpleOneSidedTemplate", (accounts) => {
  order.owner = accounts[3];
  let simpleOneSidedTemplate;
  const token0 = accounts[1];
  const token1 = accounts[2];

  it("Value Test 1", async () => {
    simpleOneSidedTemplate = await SimpleOneSidedTemplate.deployed();

    order.params = [0, 4, ...curve];

    const price = await simpleOneSidedTemplate.getPrice(
      Token(1),
      token0,
      order,
      token0,
      token1
    );
    assert.equal(
      _Token(price),
      "5.000000000000099925",
      "This test should not fail"
    );
  });

  it("Value Test 2: less than Low boundary", async () => {
    try {
      await simpleOneSidedTemplate.getPrice(
        Token(0),
        token0,
        order,
        token0,
        token1
      );
    } catch (err) {
      assert(
        err.message.indexOf("The requested value is less than the curve"),
        "This test should not fail"
      );
    }
  });

  it("Value Test 3: Low boundary", async () => {
    const price = await simpleOneSidedTemplate.getPrice(
      Token(1, 1),
      token0,
      order,
      token0,
      token1
    );
    assert.equal(_Token(price), "0.0000000000001", "This test should not fail");
  });

  it("Value Test 4: greater than High boundary", async () => {
    try {
      await simpleOneSidedTemplate.getPrice(
        Token(8001),
        token0,
        order,
        token0,
        token1
      );
    } catch (err) {
      assert(
        err.message.indexOf("The requested value is greater than the curve"),
        "This test should not fail"
      );
    }
  });

  it("Value Test 5: High boundary", async () => {
    const price = await simpleOneSidedTemplate.getPrice(
      Token(8000),
      token0,
      order,
      token0,
      token1
    );
    assert.equal(_Token(price), "40000", "This test should not fail");
  });

  it("SimpleOneSidedTemplate: TOKEN is not valid test 1", async () => {
    try {
      await simpleOneSidedTemplate.getPrice(
        Token(60),
        token0,
        order,
        token0,
        token1
      );
    } catch (err) {
      assert(
        err.message.indexOf("TOKEN is not valid"),
        "This test should not fail"
      );
    }
  });

  it("SimpleOneSidedTemplate: TOKEN is not valid test 2", async () => {
    try {
      await simpleOneSidedTemplate.getPrice(
        Token(60),
        token1,
        order,
        token0,
        token1
      );
    } catch (err) {
      assert(
        err.message.indexOf("TOKEN is not valid"),
        "This test should not fail"
      );
    }
  });
});
