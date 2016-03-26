'use strict';

const blackCard = (g) => {
    var t
    if (g.names.length === 1) return g.names[0]

    if (g.num % g.names.length === 0) {
        t = g.names.length
    } else {
        t = g.num % g.names.length
    }

    g.names = g.names.filter((n, i) =>
        t === 1 ? t !== i + 1 : (i + 1) % t !== 0
    )

    return blackCard(g)
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