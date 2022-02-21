// /* eslint-disable no-undef */
const Registry = artifacts.require("Registry");
const Pair = artifacts.require("Pair");
const CustomERC20Token = artifacts.require("CustomERC20Token");
const { defaultErrMsg, toToken, Token } = require("./helpers");

contract("Pair", (accounts) => {
  let registryInstance,
    tokenA,
    tokenB,
    pairAddress,
    pair,
    snapshot,
    length,
    order;
  const marketMaker = accounts[0];
  const bob = accounts[1];

  it("Set Up", async () => {
    registryInstance = await Registry.deployed();
    tokenA = await CustomERC20Token.new("My Token A", "TKNA", {
      from: accounts[3],
    });
    tokenB = await CustomERC20Token.new("My Token B", "TKNB", {
      from: accounts[3],
    });
    await registryInstance.createPair(tokenA.address, tokenB.address);

    pairAddress = await registryInstance.allPairs(0);
    pair = await Pair.at(pairAddress);

    await tokenA.unlimitedMint(marketMaker, 8000);
    await tokenB.unlimitedMint(marketMaker, 40000);
    await tokenB.unlimitedMint(bob, 40000);
  });

  it("Place Order", async () => {
    const params = [
      4,
      ...[Token(1, 1), Token(4000), Token(6000), Token(8000)],
      ...[Token(10000, 1), Token(20000), Token(30000), Token(40000)],
      ...[Token(10000, 1), Token(20000), Token(30000), Token(40000)],
      ...[Token(1, 1), Token(4000), Token(6000), Token(8000)],
    ];
    const deadline = parseInt(await tokenA.getBlockchainParams()) + 10000000;

    length = await pair.allOrdersLength();
    assert.equal(parseInt(length), 0, defaultErrMsg);

    await pair.placeOrder(1, params, deadline, {
      from: marketMaker,
    });

    length = await pair.allOrdersLength();
    assert.equal(parseInt(length), 1, defaultErrMsg);

    order = await pair.orders(0);
    assert.equal(order.amount0, 0, defaultErrMsg);
    assert.equal(order.amount1, 0, defaultErrMsg);
  });

  it("Provide Liquidity Failes: Is not an order owner: Allowance is not enough.", async () => {
    try {
      await pair.provideLiquidity(tokenA.address, 8, 0, { from: accounts[7] });
    } catch (err) {
      assert(err.message.indexOf("Is not an order owner"), defaultErrMsg);
    }
  });

  it("Provide Liquidity Failes", async () => {
    try {
      await pair.provideLiquidity(tokenA.address, 8, 0, { from: marketMaker });
    } catch (err) {
      assert(err.message.indexOf("Allowance is not enough."), defaultErrMsg);
    }
  });

  it("Provide Liquidity", async () => {
    snapshot = [
      (await tokenA.balanceOf(marketMaker)).toString(),
      (await tokenB.balanceOf(marketMaker)).toString(),
      (await tokenA.balanceOf(pairAddress)).toString(),
      (await tokenB.balanceOf(pairAddress)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([8000, 40000, 0, 0]), defaultErrMsg);

    await tokenA.increaseAllowance(pairAddress, Token(8000), {
      from: marketMaker,
    });
    await tokenB.increaseAllowance(pairAddress, Token(40000), {
      from: marketMaker,
    });

    await pair.provideLiquidity(tokenA.address, Token(8000), 0, {
      from: marketMaker,
    });
    await pair.provideLiquidity(tokenB.address, Token(40000), 0, {
      from: marketMaker,
    });

    snapshot = [
      (await tokenA.balanceOf(marketMaker)).toString(),
      (await tokenB.balanceOf(marketMaker)).toString(),
      (await tokenA.balanceOf(pairAddress)).toString(),
      (await tokenB.balanceOf(pairAddress)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([0, 0, 8000, 40000]), defaultErrMsg);

    order = await pair.orders(0);
    assert.equal(order.amount0.toString(), Token(8000), defaultErrMsg);
    assert.equal(order.amount1.toString(), Token(40000), defaultErrMsg);
  });

  it("Buy", async () => {
    snapshot = [
      (await tokenA.balanceOf(bob)).toString(),
      (await tokenB.balanceOf(bob)).toString(),
    ];
    assert.deepEqual(snapshot, toToken([0, 40000]), defaultErrMsg);

    assert.equal(await pair.token0.call(), tokenA.address, defaultErrMsg);
    assert.equal(await pair.token1.call(), tokenB.address, defaultErrMsg);

    await tokenB.increaseAllowance(pairAddress, Token(10), {
      from: bob,
    });

    await pair.swap(0, Token(10), tokenB.address, Token(1.9), {
      from: bob,
    });

    order = await pair.orders(0);
    assert.equal(
      order.amount0.toString(),
      "7998000000000000019981",
      defaultErrMsg
    );
    assert.equal(order.amount1.toString(), Token(40010), defaultErrMsg);

    snapshot = [
      (await tokenA.balanceOf(bob)).toString(),
      (await tokenB.balanceOf(bob)).toString(),
      (await tokenA.balanceOf(pairAddress)).toString(),
      (await tokenB.balanceOf(pairAddress)).toString(),
    ];
    assert.deepEqual(
      snapshot,
      [
        "1999999999999980019",
        "39990000000000000000000",
        "7998000000000000019981",
        "40010000000000000000000",
      ],
      defaultErrMsg
    );
  });

  it("Remove Liquidity", async () => {
    await pair.removeLiquidity(tokenA.address, Token(1), 0, {
      from: marketMaker,
    });

    await pair.removeLiquidity(tokenB.address, Token(1), 0, {
      from: marketMaker,
    });

    snapshot = [
      (await tokenA.balanceOf(marketMaker)).toString(),
      (await tokenB.balanceOf(marketMaker)).toString(),
      (await tokenA.balanceOf(pairAddress)).toString(),
      (await tokenB.balanceOf(pairAddress)).toString(),
    ];
    assert.deepEqual(
      snapshot,
      [
        "1000000000000000000",
        "1000000000000000000",
        "7997000000000000019981",
        "40009000000000000000000",
      ],
      defaultErrMsg
    );
  });

  it("Cancel Order", async () => {
    await pair.cancelOrder(0, {
      from: marketMaker,
    });

    snapshot = [
      (await tokenA.balanceOf(marketMaker)).toString(),
      (await tokenB.balanceOf(marketMaker)).toString(),
    ];
    assert.deepEqual(
      snapshot,
      ["7998000000000000019981", "40010000000000000000000"],
      defaultErrMsg
    );
  });
});
