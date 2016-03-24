'use strict';

let lastPos = 0

const go = (i) => {
    if (i === lastPos) {
        return '|'
    }
    if (lastPos < i) {
        lastPos++
        return "\\"
    }
    lastPos--
    return '/'
}

const parseLine = (line) => {
    let went = false
    let c = line.indexOf('C'),
        _ = line.indexOf('_')
    lastPos = lastPos || _ //T ODO
    line = line.split('')

    if (-1 !== c) {
        went = true
        line.splice(c, 1, go(c))
    }
    if (-1 !== _ && !went) {
        line.splice(_, 1, go(_))
    }
    return line.join('')
}

const run = (lines) => {
    return lines.split('\n').map(parseLine).join('\n')
}

module.exports.run = run