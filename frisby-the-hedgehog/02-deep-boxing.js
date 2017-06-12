const Box = require('./01-boxing')

const moneyToFloat = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .fold(parseFloat)

const percentToFLoat = str =>
  Box(str.replace(/\%/g, ''))
    .map(parseFloat)
    .fold(n => n * 0.01)

const applyDiscount = (price, discount) =>
moneyToFloat(price) * ( 1 - percentToFLoat(discount))

const result = applyDiscount('$500', '20%')
// console.log(result);
// 400

// 2 boxes deep
const applyDiscount2 = (price, discount) =>
  moneyToFloat(price)
    .map(cost => percentToFLoat(discount)
      .map(savings => cost - cost * savings))

const result2 = applyDiscount('$500', '20%')
// 400
