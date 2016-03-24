'use strict';

let arr = Array.from({length: 256}, () => 0).map(row =>
    Array.from({length: 256}, () => 0)
)

const add = (a, b) => a + b
const parseLine = (line) => {
    const out = line.split(' ')
    const command = out[0]
    const x = parseInt(out[1], 10)
    const y = parseInt(out[2], 10)
    return {command, x, y}
}

const modifyArr = (com) => {
    return {
        SetCol () {
            arr = arr.map(row => {
                row[com.x] = com.y
                return row
            })
        },
        SetRow () {
            arr[com.x] = Array.from({length: 256}, () => com.y)
        },
        QueryCol () {
            console.log(arr.map(row => row[com.x]).reduce(add))
        },
        QueryRow () {
            console.log(arr[com.x].reduce(add))
        }
    }[com.command]()
}

// [[0, 0, 0],
//  [0, 1 , 1],
//  [1, 1, 0]]
const run = (lines) => {
    lines.split('\n').map(parseLine).map(modifyArr)
}

module.exports.run = run