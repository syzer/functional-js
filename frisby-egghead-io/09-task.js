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
        x => console.log('success', x)
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


// 3 async task
const Db = ({
    find: id => new Task((rej, res) =>
        setTimeout(() => res({ id, title: `Project ${id}` }), 100))
})

const reportHeader = (p1, p2) => `Report: ${p1.title} compared to ${p2.title}`

Task.of(p1 => p2 => reportHeader(p1, p2))
    .ap(Db.find(20))
    .ap(Db.find(8))
    .fork(console.error, console.log)
// Report: Project 20 compared to Project 8

const futurize = require('futurize').futurize(Task)
const { List } = require('immutable-ext')

const readFile2 = futurize(fs.readFile)

const files = List(['config.json', 'config2.json'])
    .map(f => __dirname + '/' + f)


// traverse like map but, re arrange types:
// [Task, Task2] => Task([])
// Task.of because do not know type
const res2 = files.traverse(Task.of, fn => readFile2(fn, 'utf-8'))
    .fork(console.error, console.log)
// List [ "{\n    \"icons\": true\n}", "{\n    \"superUnicorns\": true\n}" ]
