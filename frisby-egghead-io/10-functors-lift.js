const { Box } = require('./01-boxing')
const { Either} = require()
const { Task } = require('data.task')

// functors:
// 1. has map
// 2. law of composition
// fx.map(f).map(g) === fx.map(x => g(f(x)))
// 3. identity
// fx.map(id) === id(fx)

const id = x => x

const res1 = Box('Donner').map(id)
const res2 = id(Box('Donner'))

// they are different objects
console.log(res1, res2, res1 == res2)


Task.of('hello')
Either.of('hello')
Box.of(100)