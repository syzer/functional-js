'use strict';

let lastPos = 0

const blackCard = (g) => {
    console.log(g.names)
    if (lastPos>2) return
    if (g.names.length === 1) {
        return g.names[0]
    }
    g.names = g.names.filter((n, i) => {
        console.log(i, g.num, g.num %i, n, g.num %(i+1))
        return  g.num % i !== 1
    })
    console.log(g.names)

    return blackCard(g, lastPos++)
}

const parseLine = (line) => {
    const out = line.split(' | ')
    return {
        names: out[0].split(' '),
        num: parseInt(out[1], 10)
    }
}

const run = (lines) => {
    return lines.split('\n').map(parseLine).map(blackCard).join('\n')
}

module.exports.run = run