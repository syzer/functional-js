'use strict'

const _ = require('lodash')

const matrixRotate = (lines) => {
    let rot = _.cloneDeep(lines)
    console.log('rotated', rot)
    lines.map((row, i) =>
        row.map((c, j) => {
            console.log(c, lines.length - 1 - i, lines.length - j - 1)
            rot[i][lines.length - j - 1] = c
        })
    )
    console.log('rot', rot)
    throw 'kpytko'
}

// fold
const parseLine = (line) => {
    line = line.split(' ')
    let len = line.length / 2
    return line.reduce((acc, curr, i) => {
        if (i % len === 0) {
            acc.push([curr])
        } else {
            acc[acc.length - 1].push(curr)
        }
        return acc
    }, [])
}


const run = (lines) => {
    return lines.split('\n').map(parseLine).map(matrixRotate).join('\n')
}

module.exports.run = run