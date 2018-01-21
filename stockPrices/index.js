// Given set of prices find a max possible gain in that day...
// buy low sell high

// TODO WIP
const assert = require('assert')

const prices = [1, 2, 3, 4, 5]
const prices2 = [3, 7, 0, 6, 4]

const maxGain = arr => arr.reduce((acc, curr, i, arr) => {
  if (acc.max < curr) {
    acc.curr = curr - acc.min
    acc.max = curr
  }

  if (acc.min > curr) {
    acc.curr = acc.max - curr
    acc.min = curr
  }
  // acc.curr = acc.max - acc.min

  console.log(acc)
  return acc
}, {
  max: 0,
  min: 1000000,
  test: 0,
  curr: 0,
})


// assert(maxGain(prices) === 5 - 1)
assert(maxGain(prices2) === 5 - (-2))
