#!/usr/bin/env node
'use strict'

const _ = require('lodash')
const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const isPrime = (n) => {
    // smallest prime that divides n
    const leastFactor = (n) => {
        if (isNaN(n) || !isFinite(n)) return NaN
        if (n == 0) return 0;
        if (n % 1 || n * n < 2) return 1;
        if (n % 2 == 0) return 2
        if (n % 3 == 0) return 3
        if (n % 5 == 0) return 5
        var m = Math.sqrt(n)
        for (var i = 7; i <= m; i += 30) {
            if (n % i == 0)      return i
            if (n % (i + 4) == 0)  return i + 4
            if (n % (i + 6) == 0)  return i + 6
            if (n % (i + 10) == 0) return i + 10
            if (n % (i + 12) == 0) return i + 12
            if (n % (i + 16) == 0) return i + 16
            if (n % (i + 22) == 0) return i + 22
            if (n % (i + 24) == 0) return i + 24
        }
        return n
    }
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false
    return n == leastFactor(n)
}
const isPrimeFast = _.memoize(isPrime)

const isPrimeOnSomeBases = (str) => bases.find(base =>
    isPrimeFast(parseInt(str, base))
)

const getJamCoinNumbers = (n, maxCoins) => {
    var jamCoins = []
    for (let y = 1; y < Math.pow(2, n); y++) {
        var str = ''
        for (let x = 0; x < n; x++) {
            str += (y >> x) & 1
        }
        if (str[0] == 1 && str[str.length - 1] == 1) {
            if (!isPrimeOnSomeBases(str)) {
                jamCoins.push(str)
                if (jamCoins.length === maxCoins) {
                    return jamCoins
                }
            }
        }
    }
    console.warn(jamCoins)
    return jamCoins
}
const getJamCoins = _.memoize(getJamCoinNumbers, (a,b) => `${a},${b}`)

const genFactors = (str, bases) => {
    const nums = []

    bases.map((base, bi) => {
        let num = parseInt(str, bases[bi])
        // for (let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
        for (let i = 2; i < num; i++) {
            if (num % i === 0 && i !== num) {
                if (!nums.find(n => n === i)) {
                    nums.push(i)
                    return;
                }
            }
        }
    })

    return nums;
}

// TODO it's overkill, no need to iterate all
const getAllDividers = (str) => {
    return genFactors(str, bases)
}

const coinJam = (str) => {
    const input = str.split(' ').map(n => parseInt(n, 10))
    const n = input[0]
    const j = input[1]
    let nums = getJamCoins(n, j)

    const dividers = nums.map(getAllDividers)

    return nums.map((n, ni) =>
        `${n} ${dividers[ni].join(' ')}`
    ).join('\n')
}

const run = coinJam

const processStream = (inStream) => {
    const readline = require('readline'),
        outStream = new (require('stream'))(),
        rl = readline.createInterface(inStream, outStream)

    // skip first line
    let i = -1
    rl.on('line', line => {
        i++
        if (!i) return
        console.log(`Case #${i}:\n${run(line)}`)
    })
}
processStream(process.stdin)