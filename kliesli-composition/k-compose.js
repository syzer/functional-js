// Normal parsing of file is quite brittle

const fs = require('fs')
const folktale = require('folktale')
const Either = require('data.either') // TODO move to folktale.result
// const { concurrency: {Task} } = folktale // TODO
const Task = require('data.task')
const R = require('ramda')

// read :: String -> Task
const read = path =>
  new Task((reject, resolve) =>
    fs.readFile(path, 'utf-8', (error, data) => error
      ? reject(error)
      : resolve(data)))

// check :: buffer -> Task(_, Either)
const check = buffer => Task.of(
  buffer.length > 1 ?
    Either.Right(buffer) :
    Either.Left('File is empty!')
)

// decode :: String -> Either(Buffer) -> Task(_, String)
const decode = encoding => buffer =>
  Task.of(buffer.map(b => b.toString(encoding)))

// words :: String -> Task(_, String)
const words = text =>
  Task.of(text.map(t => t.split(' ').length))

// countWords :: String -> Task(Error, Either)
const countWords = R.composeK(
  words,
  decode('utf8'),
  check,
  read
)

// Normal Functions
const checkNormal = buffer =>
  buffer.length > 1
    ? buffer
    : null

const withEither = fn => args =>
  args.map(e => fn(e))

// With normal functions
const decodeNormal = encoding => buffer =>
  buffer.toString(encoding)

const wordsNormal = text =>
  text.split(' ').length

// const makeNull = e => null
const makeNull = e => Either.Left('File is empty!')

// Wrapper
const asTask = R.o(Task.of)
const nullable = R.o(Either.fromNullable)

// Short Notation
const _ = R.compose(asTask, withEither)
const _Nil = fn => asTask(nullable(fn))

const countWordsNormal = R.pipeK(
  read, // Task
  _Nil(checkNormal), // Task of Either
  _(decodeNormal('utf8')), // Task of Either
  // asTask(makeNull),
  _(wordsNormal) // Task of Either
)


module.exports = {
  countWords,
  read,
  countWordsNormal
}
