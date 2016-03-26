'use strict';

let lastPos = 0

const football = (nums) => {
    console.log(nums)
    return nums.reduce((acc, curr) => {
        return acc
    })
}

const parseLine = (line) => line.split(' | ')
    .map(e => e.split(' ')
        .map(n => parseInt(n, 10))
    )

const run = (lines) => {
    return lines.split('\n').map(parseLine).map(football).join('\n')
}

module.exports.run = run