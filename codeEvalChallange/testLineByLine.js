const run = (line) =>
    line.split('|').map(col =>
            col.trim().split(' ').map(el => parseInt(el))
        )
        .reduce((max, curr) =>
            max.map((el, i) => max[i] > curr[i] ? max[i] : curr[i])
        ).join(' ')

const processFile = (inputFile) => {
    const fs = require('fs'),
        readline = require('readline'),
        inStream = fs.createReadStream(inputFile),
        outStream = new (require('stream'))(),
        rl = readline.createInterface(inStream, outStream)

    rl.on('line', line => console.log(run(line)))
}

processFile('./tempFile.txt')