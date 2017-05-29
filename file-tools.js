import { readFile, readFileStream, writeFile } from 'function-file-tools'

const app = readFile(__dirname + '/README.md')
.map(e => e.split(/[\n\t]/gi))
.chain(contents => writeFile(__dirname + '/.tmp.txt', contents))

// when you want to have side effect
app.fork(console.error, console.log)