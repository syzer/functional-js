'use strict'

function lastWord(str) {
    return str.split('').sort((b, a) => {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    }).join('')
}

const run = lastWord

const processStream = (inStream) => {
    const readline = require('readline'),
        outStream = new (require('stream'))(),
        rl = readline.createInterface(inStream, outStream)

    // skip first line
    let i = -1
    rl.on('line', line => {
        i++
        if (!i) return
        console.log(`Case #${i}: ${run(line)}`)
    })
}
processStream(process.stdin)
