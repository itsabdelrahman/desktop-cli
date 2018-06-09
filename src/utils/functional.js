const ifElse = (ifCondition, thenValue, elseValue) =>
  ifCondition ? thenValue : elseValue;

const pipe = (...funcs) => thing =>
  funcs.reduce((accumulation, func) => func(accumulation), thing);

module.exports = {
  ifElse,
  pipe
};
