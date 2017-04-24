/**
 * Alice is a kindergarten teacher. She wants to give some candies to the children in her class.  All the children sit in a line ( their positions are fixed), and each  of them has a rating score according to his or her performance in the class.  Alice wants to give at least 1 candy to each child. If two children sit next to each other, then the one with the higher rating must get more candies. Alice wants to save money, so she needs to minimize the total number of candies given to the children.

 Input Format

 The first line of the input is an integer N, the number of children in Alice's class. Each of the following N lines contains an integer that indicates the rating of each child.

 Constraints

 Output Format

 Output a single line containing the minimum number of candies Alice must buy.
 */
const _ = require('lodash')
const slice = _.curryRight((str, num) => str.slice(num))
const split = _.curryRight((str, val) => str.split(val))
const R = require('ramda')

function processData(input) {
    R.pipe(
        R.slice(2, Infinity),
        R.split('\n'),
        R.reduce((acc, curr) => {
            console.log(acc)
            if (acc.prev < curr) {
                acc.spend += 1
            } else if (acc.spend === 1) {
            } else {
                acc.spend -= 1
            }
            acc.total += acc.spend
            return {
                prev: curr,
                spend: acc.spend,
                total: acc.total
            }
        }, {
            prev: 0,
            spend: 0,
            total: 0
        }),
        t => t.total,
        console.log
    )(input)
}

process.stdin.resume()
process.stdin.setEncoding('ascii')
_input = ''
process.stdin.on('data', function (input) {
    _input += input
})

process.stdin.on('end', function () {
    processData(_input)
})