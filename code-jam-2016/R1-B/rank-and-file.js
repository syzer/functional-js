'use strict'

function rankAndFile(rows) {
    rows = rows.sort()
    var next = 0;

    // for (let i = 1; i < rows.length; i++) {
    //     for (let j = 0; j < rows[i].length; j++) {
    //         let curr = rows[i][j]
    //         if (rows[i - 1][j] + 1 !== curr && rows[i - 1][j] !== curr) {
    //             console.log(i, j, curr, 'vs', rows[i - 1][j], rows[i])
    //             return rows[i]
    //         }
    //     }
    // }
    // var min = rows[0][0]
    // for (rows[1][0]

    var maxVector = {}
    for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j < rows[i].length; j++) {
            let c = rows[j][i]
            if (c === rows[j - 1][i] || c === rows[j - 1][i] + 1) {

            } else {
                maxVector[j] = [c, j, i]
            }
        }
    }

    return maxVector
}

var inputSorted = [
    [1, 2, 3],
    [1, 2, 3],
    [2, 3, 4],
    [2, 3, 5],
    [3, 5, 6]
]

const run = rankAndFile

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
    [1, 2, 3],
    [2, 3, 5],
    [3, 5, 6],
    [2, 3, 4],
    [1, 2, 3]
]


console.log(run(input))