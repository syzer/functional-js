// cat lences-es7-ramda/access.log  |  node lences-es7-ramda/ramda.transducers.log.parsing.js

const log = [
    '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -',
    '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
    '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
    '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -`'
]


let R = require('ramda')

// debug
// const look = require('ramda-debug')
// R = look.wrap(R)

const isGet = R.test(/GET \//)
const notStatic = R.complement(R.test(/GET \/static/))
// BAM!
const isPage = R.allPass([isGet, notStatic])
R.filter(isPage, log)
// [ '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
// '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -' ]

const splitLine = R.pipe(
    R.match(/^(\S+).+"([^"]+)"/),
    R.tail
)

// R.map(splitLine)
// [ [ '127.0.0.1', 'GET /static/r.js HTTP/1.1' ],
// [ '127.0.0.5', 'GET /blog/ HTTP/1.1' ],
// [ '127.0.0.1', 'GET / HTTP/1.1' ],
// [ '127.0.0.1', 'POST / HTTP/1.1' ] ]

const toURL = R.pipe(
    R.split(' '),
    // R.slice(6, 7),
    R.slice(1, 2),
    R.prepend('http://github.com/syzer'),
    R.join('')
)
// [ 'http://github.com/syzer/static/r.js',
// 'http://github.com/syzer/blog/',
// 'http://github.com/syzer/',
// 'http://github.com/syzer/' ]

// const toUrlDebug = look.fov(toURL)
// R.map(toUrlDebug, log)

// Lens to operate on value in [key, value] pair
const valueLens = R.lensIndex(1)
// ['IP', 'GET /url/path'] -> ['IP', 'http://github.com/syzer/url/path']
const valueToUrl = valueLens(toURL)

R.map(valueToUrl, [
    ['127.0.0.5', 'GET /blog/ HTTP/1.1'],
    ['127.0.0.1', 'GET / HTTP/1.1']])

const joinVisited = R.pipe(
    R.join(' visited '),
    R.concat(R.__, '\n') // was R.add
)

R.map(joinVisited, [
    ['127.0.0.5', 'http://doge.com/blog/'],
    ['127.0.0.1', 'http://muchdoge.com/']
])
// [ '127.0.0.5 visited http://doge.com/blog/\n',
// '127.0.0.1 visited http://muchdoge.com/\n' ]

R.into('dupa', R.identity, ['hello\n', 'world\n'])

const lines = require('transduce').string.lines
const stream = require('transduce-stream')
const fs = require('fs')
const path = require('path')
// const logFile = fs.readFileSync(path.join(__dirname, './access.log'), {encoding: 'utf8'})

const parseLog = R.compose(
    lines(),
    R.filter(isPage),
    R.map(splitLine),
    R.map(valueToUrl),
    R.map(R.join(' visited ')),
    R.map(R.concat(R.__, '\n'))
)
// not woring as intended
// const out = R.into('', parseLog, [logFile])

process.stdin.pipe(stream(parseLog)).pipe(process.stdout)
process.stdin.resume()