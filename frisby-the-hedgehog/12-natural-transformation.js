// const Either = require('./04-either')
const { Left, Right, fromNullable } = require('./03-either')
const Box = require('./01-boxing')
const Task = require('data.task')

// natural transform :
// AKA type conversion
// F a -> G a
// nt(x).map(f) === nt(x.map(f))
// map and filter order can be reversed

// Left would valiate ^^
const boxToEither = b =>
  b.fold(Right)

const res1 = boxToEither(Box(42)).map(x => x * 2)
const res2 = boxToEither(Box(42).map(x => x * 2))
console.log(res1, res2)
// Right(84), Right(84)

const first = xs => fromNullable(xs[0])

const twice = x => x * 2
const res3 = first([1, 2, 3]).map(twice)
const res4 = first([1, 2, 3].map(twice))
console.log(res3, res4)
// Right(2), Right(2)

const smallNumbers = xs => xs.filter(x => x < 3)

const app = xs => first(smallNumbers(xs).map(twice))
// using transformation we can get first and then map, so we dont waste so much CPU
const app2 = xs => first(smallNumbers(xs)).map(twice)
console.log(app([2, 3, 4]), app2([2, 3, 4]))
// Right(4) Right(4)

const { List } = require('immutable-ext')

const mock = id => ({ id, name: 'Doge', bestFriendId: id + 1 })

const Db = {
  find: id =>
    new Task((rej, res) =>
      res(id > 2 ? Right(mock(id)) : Left('que passa?')))
}

const eitherToTask = e => e.fold(Task.rejected, Task.of)

Db.find(3)  // Task(Right(user))
  .map(either =>
    either.map(user => Db.find(user.bestFriendId)))  // Right(Task(Right(User)))

Db.find(3)  // Task(Right(user))
  .chain(eitherToTask)
  .chain(user => Db.find(user.bestFriendId))
  .chain(eitherToTask)
  .fork(console.error, console.log)
// { id: 4, name: 'Doge', bestFriendId: 5 }
