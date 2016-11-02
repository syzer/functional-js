process.stdin.resume()
process.stdin.setEncoding('ascii')

var input_stdin = ""
var input_stdin_array = ""
var input_currentline = 0

process.stdin.on('data', function (data) {
    input_stdin += data
})

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n")
    main()
})

function readLine() {
    return input_stdin_array[input_currentline++]
}

/////////////// ignore above this line ////////////////////

function main() {
    var t = parseInt(readLine())
    for (var a0 = 0; a0 < t; a0++) {
        var R_temp = readLine().split(' ')
        var R = parseInt(R_temp[0])
        var C = parseInt(R_temp[1])
        let G = []
        for (var G_i = 0; G_i < R; G_i++) {
            G[G_i] = readLine()
        }
        var r_temp = readLine().split(' ')
        var r = parseInt(r_temp[0])
        var c = parseInt(r_temp[1])
        var P = []
        for (var P_i = 0; P_i < r; P_i++) {
            P[P_i] = readLine()
        }

        // console.log(G, P)
        let bmatches = []
        let test = P.filter((srow, i) => {
            return G.filter((brow, j) => {
                let regex = new RegExp(`(${srow})`, 'g')
                var matches = []
                var match = regex.exec(brow)
                if (j > 990&& match) {
                    console.log(i, j, brow.slice(0, 10), srow)
                    console.log(match)
                }
                while (match !== null) {
                    matches.push(match.index)
                    match = regex.exec(brow)
                }
                if (matches.length !== 0) {
                    if (j > 990) {
                        // console.log(i, j, brow.slice(0, 10), srow)
                        console.log(matches)
                    }
                    bmatches.push({matches, i, j})
                    return true
                }
                return false
            })
        })
        console.log(bmatches.slice(370, 390))
        var startJ = bmatches[0].j - 1
        var reduced = bmatches.reduce((acc, curr) => {
            // console.log(acc, curr)
            if (curr.j === acc.j + 1) {
                // todo here check the same row
                var sameRow = curr.matches.some(e => acc.matches.includes(e))
                if (sameRow) {
                    // console.log(curr.j)
                    if (curr.j - startJ === P.length) {
                        acc.longest = P.length
                    }
                    return {j: ++acc.j, matches: curr.matches, longest: acc.longest}
                }
            }
            return {j: startJ, matches: curr.matches, longest: acc.longest}
        }, {
            // curr longest
            j: startJ,
            // same row
            matches: bmatches[0].matches,
            // longestConsecutive
            longest: 0
        })
        console.log(reduced.longest === P.length ? 'YES' : 'NO')
    }
}
