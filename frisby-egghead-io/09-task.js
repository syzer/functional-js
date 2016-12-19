const Task = require('data.task')
const fs = require('fs')

Task.of(1)
    .map(x => x + 1)
    .chain(x => Task.of(x + 1))
    .fork(e => console.error('Err ', e),
        res => console.log('Success ', res)
    )

// Success 3

// capturing side effect

const formatHdd = () =>
    new Task((rej, res) => {
        console.log('Destorying your db')
        res('done')
    })

// lib stay pure
const app = formatHdd().map(x => x + '!')

// client extends library code
app.map(x => x + '!')
// this makes task run
    .fork(
        console.error,
        x => console.log('sucess', x)
    )

// statefull.. needs a rewrite
const app2 = () =>
    fs.readFile(__dirname + 'config.json', 'utf-8', (err, contents) => {
        if (err) throw err

        const newContents = contents.replace(/icons/g, 'superUnicorns')

        fs.writeFile(__dirname + 'config2.json', newContents, (err, _) => {
            if (err) throw err
            console.log('success')
        })
    })

const readFile = (filename, enc) =>
    new Task((rej, res) =>
        fs.readFile(filename, enc, (err, contents) =>
            err ? rej(err) : res(contents)))

const writeFile = (filename, contents) =>
    new Task((rej, res) =>
        fs.writeFile(filename, contents, (err, success) =>
            err ? rej(err) : res(success)))

const app3 =
    readFile(__dirname + '/config.json', 'utf-8')
        .map(contents => contents.replace(/icons/g, 'superUnicorns'))
        .chain(contents => writeFile(__dirname + '/config2.json', contents))

// side effect outside app!
app3.fork(console.error,
    x => console.log('success'))