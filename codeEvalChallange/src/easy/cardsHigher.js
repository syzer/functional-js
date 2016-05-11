'use strict';

const pad = (num) => num < 10 ? `0${num}` : `${num}`

const toNum = (a, t) => {
    let val = 0
    const charValue = {
        A: 20,
        K: 18,
        Q: 16,
        J: 14
    }
    if (t === a.charAt(a.length - 1)) {
        val += 100
    }
    // 'A', 'K', 'Q', 'J'
    if (a.charCodeAt(0) > 60) {
        val += charValue[a.charAt(0)] + a.substring(1)
    } else {
        val += parseInt(a.substr(0, a.length - 1))
    }

    return val
}

const compare = (a, b, t) => {
    var t = toNum(a, t)
    var z = toNum(b, t)
    console.log(t,z)
    return t-z
}

const cardsHigher = (data) => {
    let cards = data[0]
    let t = data[1][0]


    if (compare(cards[0], cards[1]) > 1) {
        return cards[0]
    } else if (compare(cards[0], cards[1]) > 1) {
        return cards[1]
    } else {
        return cards.join(' ')
    }
}

const parseLine = (line) =>
    line.split(' | ').map(el => el.split(' '))

const run = (lines) => {
    return lines.split('\n').map(parseLine).map(cardsHigher).join('\n')
}

module.exports.run = run