// Given set of prices find a max possible gain in that day...
// buy low sell high

// TODO WIP
const assert = require('assert')

const prices = [1, 2, 3, 4, 5]
const prices2 = [4, 8, 1, 2, 7, 5]
const prices3 = [4, 8, 1, 2, 7, 5, 9]
// 1, 9

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

const raising = []
let currMax = 0
let prevMax = 0
let currMin = 1000000
let prevMin = 1000000

const maxGain2 = arr => arr.reduce((acc, curr, i, arr) => {
  if (curr > acc) {
    raising.push(curr - acc)
    currMax = curr
    // return curr - acc
  }

  if (curr < acc) {
    if (prevMin < currMin) {
      prevMin = currMin
    }
    currMin = curr
    return 0
  }

  console.log(acc, curr, raising, currMax, currMin, prevMin, prevMax)
  return curr
}, 0)

const add = (a,b) => a + b

const maxGain3 = acc => acc
  .map((e, i, arr) =>
    arr[i - 1]
      ? e - arr[i - 1]
      : 0)
  .map(console.log)
  .reduce((acc, curr) => {
    if (curr > 0) {
      acc.seq.push(curr)
      if (acc.max < curr) {
        acc.max = curr
      }
      let currMax = acc.seq.reduce(add, 0)
      if (currMax > acc.max) {
        acc.max = currMax
      }
    } else {
      // reset while dropping
      let currMax = acc.seq.reduce(add, 0)
      if (currMax > acc.max) {
        acc.max = currMax
      }
      acc.seq = []
    }
    acc.curr = curr
    // console.log(curr, acc)
    return acc
  }, {
    seq: [],
    max: 0,
    curr: 0
  })

// console.log(maxGain3(prices2))
// console.log(maxGain3(prices))
console.log(maxGain3(prices3))

// assert(maxGain(prices) === 5 - 1)
// assert(maxGain2(prices2) === 5 - (-2))
