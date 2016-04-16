'use strict'

function bff(kids) {
    console.log(kids.sort((a,b) => (a-b)))
    var hasBff = Array.from({length: kids.length}, x => [])
    console.log(kids, hasBff)
    kids.reduce((acc, curr, i) => {
        hasBff[curr - 1].push(curr)
    }, 0)
    console.log(hasBff)
    hasBff = hasBff.filter((e, i, arr) => {
        if (arr.find(k => Math.abs(k[0] - e[0]) === 1)) {
            return true
        }
    })
    console.log(hasBff, 'atached')
    hasBff = hasBff.map(e => {
        if (e.length >= 2 || e.length ===1 ) {
            return e
        }
    })
    console.log(hasBff)
    return hasBff.reduce((a, b) => a + b)
}

function bff2(kids) {
    kids.sort((a, b) => a - b)
    console.log(kids)
    let friendChains = []
    let same = false
    for (let i = 0; i < kids.length; i++) {
        if (!same) {
            friendChains.push(kids[i])
        }
        if (same) {
            same = !same
            friendChains.push(['same', kids[i]])
        }
        if (kids[i-1] && kids[i] == kids[i - 1]) {
            same = true
        }
    }
    console.log(friendChains)
}

const run = bff

// const processStream = (inStream) => {
//     const readline = require('readline'),
//         outStream = new (require('stream'))(),
//         rl = readline.createInterface(inStream, outStream)
//
//     // skip first line
//     let i = -1
//     rl.on('line', line => {
//         i++
//         if (!i) return
//         console.log(`Case #${i}: ${run(line)}`)
//     })
//
//
// }
// processStream(process.stdin)
var input = [
    '2 3 4 1',
    '3 3 4 1',
    '3 3 4 3',
    '7 8 10 10 9 2 9 6 3 3'
].map(r => r.split(' ').map(e => parseInt(e)))

console.log(run(input[0]) === 4, run(input[0]))
console.log(/*run(input[1]) === 3,*/ run(input[1]))
// console.log(run(input[2]) === 3, run(input[2]))
// console.log(/*run(input[3]) === 6,*/ run(input[3]))