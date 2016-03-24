'use strict';

let pos = 9
let went = false

const go = (i) => {
    if (i === pos) {
        return '|'
    }
    if (pos < i) {
        pos++
        return "\\"
    }
    pos--
    return '/'
}


const parseLine = (line) => {
    went = false
    return line.split('').map((c, i) => {
        if ('#' === c) {
            return '#'
        }
        if ('C' === c) {
            went = true
            return go(i)
        }
        if ('_' === c) {
            if (went) {
                return '_'
            }
            went = true
            return go(i)
        }
    }).join('')
}

const run = (lines) => {
    return lines.split('\n').map(parseLine)
}

module.exports.run = run