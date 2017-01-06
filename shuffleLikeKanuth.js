// 29.04.2016
const _ = require('lodash')
const arr = _.range(0, 21)

const shuffle = arr => {
    for (let i = 0; i < arr.length; i++) {
        const j = _.random(i, arr.length - 1)
        swap(arr, arr[i], arr[j])
    }
}

const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

// mutates original
console.log(arr)
shuffle(arr)
console.log(arr)
