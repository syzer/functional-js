const run = (line) =>
    line.split('|').map(col =>
            col.trim().split(' ').map(el => parseInt(el))
        )
        .reduce((max, curr) =>
            max.map((el, i) => max[i] > curr[i] ? max[i] : curr[i])
        ).join(' ')


const processFile = (inputFile) => {
    const fs = require('fs')
    const readline = require('readline')
    const inStream = fs.createReadStream(inputFile)
    const outStream = new (require('stream'))()
    const rl = readline.createInterface(inStream, outStream)

    rl.on('line', line => console.log(run(line)))
}

processFile('./tempFile.txt');