const _ = require('lodash')

const len = 10
const times = 3

var arr = Array.from({length: len}, (x, i) => i + 1)
console.log(arr)

const swap = (arr) => {
    let rnd = _.random(0, arr.length)
    let rnd2 = _.random(0, arr.length)
    if (rnd2 === rnd) {
        if (rnd2 === arr.length) {
            rnd--
        } else {
            rnd2++
        }
    }
    var temp = arr[rnd]
    arr[rnd] = arr[rnd2]
    arr[rnd2] = temp

    return arr
}


for (var i = 0; i < times; i++) {
    arr = swap(arr)
}
console.log(arr.join(' '))