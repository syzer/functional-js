// nodemon -x 'cat parse.log.stream.transduce.js | node -p'
// nodemon -x 'cat data/access.log | node parse.log.stream.transduce.js '
// http://simplectic.com/blog/2015/ramda-transducers-logs/
const R = require('ramda')

const isGet = R.test(/GET \//)
const notStatic = R.complement(R.test(/GET \/static/))
const isPage = R.allPass([isGet, notStatic])
const splitLine = R.pipe(
  R.match(/^(\S+).+"([^"]+)"/),
  R.tail)

const toURL = R.pipe(
  R.split(' '),
  R.slice(1, 2),
  R.prepend('http://simplectic.com'),
  R.join(''))

R.filter(isPage, [
  '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1"',
  '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
  '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
  '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -'])
// => [ '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
//      '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -' ]

R.map(toURL, [
  'GET /blog/ HTTP/1.1',
  'GET / HTTP/1.1'])
// => ['http://simplectic.com/blog/',
//     'http://simplectic.com/' ]

// TODO
var valueLens = R.lens(
  // (entry) => entry[1]
  R.last,
  // (value, entry) => [entry[0], value]
  R.flip(R.useWith(Array, R.head)))

var valueToUrl = R.set(valueLens, toURL)
//
const test = R.map(valueLens, [
  [ '127.0.0.5', 'GET /blog/ HTTP/1.1' ],
  [ '127.0.0.1', 'GET / HTTP/1.1' ] ])
// => [ [ '127.0.0.5', 'http://simplectic.com/blog/' ],
//      [ '127.0.0.1', 'http://simplectic.com/' ] ]

console.log(test)


const joinVisited = R.pipe(
  R.join(' visited '),
  R.concat(R.__, '\n'))

R.map(joinVisited, [
  [ '127.0.0.5', 'http://simplectic.com/blog/' ],
  [ '127.0.0.1', 'http://simplectic.com/' ] ])
// => [ '127.0.0.5 visited http://simplectic.com/blog/\n',
//      '127.0.0.1 visited http://simplectic.com/\n' ]

R.into('', R.identity, ['hello\n', 'world\n'])

var fs = require('fs')
var logFile = fs.readFileSync('./data/access.log', {encoding: 'utf8'})

var parseLog = R.pipe(
  R.split('\n'),
  R.filter(isPage),
  R.map(splitLine),
  // R.map(valueToUrl),
  R.map(R.join(' visited ')),
  R.map(R.concat(R.__, '\n')))

var out = R.into('', R.identity, parseLog(logFile))
console.log(out)


const { lines } = require('transduce/string')
const stream = require('transduce-stream')

var parseLog = R.compose(
  lines(),
  R.filter(isPage),
  R.map(splitLine),
  // R.map(valueToUrl),
  R.map(R.join(' visited ')),
  R.map(R.concat(R.__, '\n')))

process.stdin.pipe(stream(parseLog)).pipe(process.stdout)
process.stdin.resume()
