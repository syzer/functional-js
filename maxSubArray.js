// 29.04.2016
// also known as Kadane's algorithm

const _ = require('lodash')
const assert = require('assert')

const reduceAdd = arr => _.reduce(arr, _.add)

const maxSubArray = arr => arr.reduce((acc, curr) => {
    const currMax = acc.currMax + curr
    if (currMax > 0) {
        acc.currMax = currMax
    } else {
        acc.currMax = 0
    }
    if (currMax >= acc.totalMax) {
        acc.totalMax = currMax
    }
    return acc
}, {
    currMax: 0,
    totalMax: 0
}).totalMax

// console.log(maxSubArray([-1, -2, 2, 3, -5, 6]))

assert(maxSubArray([1, 2, 3, 4]) === reduceAdd([1, 2, 3, 4]))
assert(maxSubArray([1, 2, 3, -1, -3]) === reduceAdd([1, 2, 3]))
assert(maxSubArray([-1, 5, 100, -1000]) === reduceAdd([5, 100]))
assert(maxSubArray([-1, -2, -3, -4]) === 0)
assert(maxSubArray([10, -1, 20, 30]) === reduceAdd([10, -1, 20, 30]))
assert(maxSubArray([-1, -2, 2, 3, -5, 6]) === reduceAdd([2, 3, -5, 6]))
