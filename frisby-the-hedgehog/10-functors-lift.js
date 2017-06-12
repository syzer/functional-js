const { Box } = require('./01-boxing')
const { Either } = require('./03-either')
const Task = require('data.task')

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

// of => lift value into a type
Task.of('hello')
Either.of('hello')
Box.of(100)

// F.of ()
// F.chain() AKA flatMap(), so we can nest computation

const http = x => Task.of(x)

http('user')
  .chain(user =>
    http(`/comments/${user.id}`
      .chain(comments => renderDOM(user, comments))))
//=> Task(Task(Task(DOM)))

const add = x => y => x + y

// const join = m => m.chain(x => x)
//
// const m = Box(Box(Box(3)))
//
// const res3 = join(m.map(join)) == join(join(m))
// console.log(res3);

const res = Box(x => y => x + y)
  .ap(Box(2))
  .ap(Box(3))
// Box(5)

// if has app.. is applicative
// F(x).map(f)  == F(f).ap(F(x))


const liftA2 = (f, fx, fy) =>
  fx.map(f).ap(fy)

const liftA3 = (f, fx, fy, fz) =>
  fx.map(f).ap(fy).ap(fz)

const res3 = liftA2(add, Box(2), Box(4))
// Box(6)

const res4 = Box(add).ap(Box(2)).ap(Box(4))
// Box(6)

// stubb jQuery
const $ = selector => Either.of({ selector, height: 10 })

const getScreenSize =
  (screen, head, foot) => screen - (head.height + foot.height)

$('header').chain(header =>
  $('footer').map(footer => getScreenSize(800, header, footer)))

// curried
const getScreenSize2 = screen => head =>
  foot => screen - (head.height + foot.height)

const res5 = Either.of(getScreenSize2(800))
  .ap($('header'))
  .ap($('footer'))

const res6 = liftA2(getScreenSize2(800), $('header'), $('footer'))
// they all are Right(780)
