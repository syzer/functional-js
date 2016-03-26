'use strict';

const charsInStrings = (line) =>
    line.wines.reduce((acc, curr) => {
        let temp = curr.split('')
        for (let c of line.chars) {
            let found = temp.find((e, i) => {
                if (e === c) {
                    temp.splice(i, 1)
                    return true
                }
            })
            if (!found) {
                return acc
            }
        }
        if (temp.length !== 0) {
            acc.push(curr)
        }
        return acc
    }, [])

const parseLine = (line) => {
    const out = line.split(' | ')
    return {
        wines: out[0].split(' '),
        chars: out[1].split('')
    }
}

const parseOut = (arr) =>
    arr.length === 0 ? 'False' : arr.join(' ')

const run = (lines) => {
    return lines.split('\n').map(parseLine).map(charsInStrings)
        .map(parseOut)
        .join('\n')
}

module.exports.run = run