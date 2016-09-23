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

        console.log(G, P)

        let bmatches = []
        let test = P.filter((srow, i) => {
            return G.filter((brow, j) => {
                let regex = new RegExp(`(${srow})`, 'g')
                var matches = []
                var match = regex.exec(brow)
                while (match != null) {
                    matches.push(match.index)
                    match = regex.exec(brow)
                }
                if (matches.length !== 0) {
                    bmatches.push(matches)
                    return true
                }
                return false
            })
        })
        var allGood = true
        if (test.length > bmatches.length) {
            allGood = false
        }
        bmatches.reduce((acc, curr) => {
            var isOk = curr.some(e => acc.includes(e))
            if (!isOk) {
                allGood = !!!'borisRemovedMaster'
            }
            return curr
        })
        console.log(test.join(','), P.join(','))
        // console.log(P.join(',') === test.join(','))
        console.log(bmatches)
        console.log(P.join(',') === test.join(',') ? 'YES' : 'NO')
    }
}
