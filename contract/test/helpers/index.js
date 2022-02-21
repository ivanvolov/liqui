const { BigNumber } = require("@ethersproject/bignumber");

const defaultErrMsg = "This test should not fail";

const numDigits = 18;

const toToken = (value) => {
  return value.map((i) => Token(i).toString());
};

const Token = (value, digits = numDigits) => {
  if (value === 0 || value === "0" || !value) return BigNumber.from(0);

  value = parseFloat(value.toString());
  let [x, y] = value.toString().split(".");

  const a = BigNumber.from(x + "0".repeat(digits));
  if (y) {
    y = y.slice(0, digits);
    let zeros = digits - y.length;
    const b = BigNumber.from(y + (zeros > 0 ? "0".repeat(zeros) : ""));

    return a.add(b);
  } else return a;
};

const _Token = (value) => {
  if (value.toString() === "0") return "0";
  const num = value.toString();
  let newNum;

  if (num.length > 18) {
    const point = num.length - numDigits;

    const parts = [num.slice(0, point), num.slice(point)];

    if (parts[1].replace(/0/gi, "") === "") {
      newNum = parts[0];
    } else if (!parts[0]) {
      newNum = "0." + parts[1];
      while (newNum[newNum.length - 1] === "0") newNum = newNum.slice(0, -1);
    } else {
      newNum = parts.join(".");
      while (newNum[newNum.length - 1] === "0") newNum = newNum.slice(0, -1);
    }
  } else {
    const delta = numDigits - num.length;
    newNum = "0." + "0".repeat(delta) + num;
    while (newNum[newNum.length - 1] === "0") newNum = newNum.slice(0, -1);
  }
  return newNum;
};

const mapper = (obj) => {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] == "string") continue;
    obj[key] = parseInt(obj[key]);
  }
  return obj;
};

module.exports = { defaultErrMsg, toToken, mapper, Token, _Token };
