const log = [
    '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -',
    '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
    '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
    '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -`'
]


let R = require('ramda')

// debud
const look = require('ramda-debug')
R = look.wrap(R)

const isGet = R.test(/GET \//)
const notStatic = R.complement(R.test(/GET \/static/))
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
    R.slice(5, 7)
    // R.prepend('http://github.com/syzer')
    // R.join('')
)

const toUrlDebug = look.fov(toURL)

console.log(R.map(toUrlDebug, log))

