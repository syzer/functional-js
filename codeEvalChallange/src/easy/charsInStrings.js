'use strict';

const charsInStrings = (line) => {

    return line.wines.reduce((acc, curr) => {
        let temp = curr.split('')
        for (let c of line.chars) {
            console.log(c)
            for (let w of curr) {
                if (w ===c) {
                    //TODO
                }
            }
            var found = temp.find((e, i) => {
                return e === c
            })
            if (!found) {
                return acc
            }
            temp.slice()
        }
        acc.push(curr)
        return acc
    }, '')
}

// TODO 'False'
// TODO ' '

const parseLine = (line) => {
    const out = line.split(' | ')
    return {
        wines: out[0].split(' '),
        chars: out[1].split('')
    }
}

const run = (lines) => {
    return lines.split('\n').map(parseLine).map(charsInStrings).join('\n')
}

module.exports.run = run