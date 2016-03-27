'use strict';

// TODO ugly as shit
const football = (nums) => {
    let out = {}
    let i = 0
    for (let group of nums) {
        i++
        for (let num of group) {
            out[num] = out[num] || []
            out[num].push(i)
        }
    }
    let out2 = []
    Object.keys(out).forEach(k => {
        out2.push(`${k}:${out[k].join()};`)
    })
    return out2.join(' ')
}

const parseLine = (line) => line.split(' | ')
    .map(e => e.split(' ')
        .map(n => parseInt(n, 10))
    )

const run = (lines) => {
    return lines.split('\n').map(parseLine).map(football).join('\n')
}

module.exports.run = run