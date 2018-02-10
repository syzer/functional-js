// Given set of prices find a max possible gain in that day...
// buy low sell high

const assert = require('assert')

const prices = [1, 2, 3, 4, 5]
const prices2 = [4, 8, 1, 2, 7, 5] // 1 - 7 max gain is 6
const prices3 = [4, 8, 1, 2, 7, 5, 9] // 1, 9 max gain is 8
const prices4 = [1, 2, 5, 2, 7, 13, 22, 3, 2, 1, 5, 7, 45, 2]
const prices5 = [8, 5, 2, 7, 13, 22, 3, 2, 1, 5, 7, 13, 2]

const add = (a, b) => a + b

// single buy sell
const maxGain = arr => {
  const t = arr.reduce((acc, curr, i, arr) => {
    if (acc.min > curr) {
      acc.min = curr
    }

    if (arr[i - 1] && curr > arr[i - 1]) {
      acc.gain += curr - arr[i - 1]
    } else {
      acc.lastGain = acc.gain
      acc.max = (acc.lastGain > acc.max ? acc.lastGain : acc.max)
      acc.gain = 0 // todo check max gain
      acc.from = curr - acc.min
    }
    return acc
  }, {
    from: Infinity,
    min: Infinity,
    max: 0,
    gain: 0,
  })
  return t.max > t.gain + t.from ? t.max : t.gain + t.from
}

// console.log(maxGain(prices2))
// console.log(maxGain(prices3))
// console.log(maxGain(prices))
console.log(maxGain(prices5))
// assert(maxGain(prices5) === 21)

// assert(maxGain2(prices2) === 5 - (-2))
