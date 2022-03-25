const BigNumber = require("bignumber.js");
const BIG_TEN = new BigNumber(10)

const getBalanceNumber = function (amount, decimals = 18) {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals)).toNumber();
};

module.exports = {
  getBalanceNumber
}
