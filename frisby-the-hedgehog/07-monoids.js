// monoid = a semi group with neutral element
const { All, Sum } = require('./05-semigroup')
const { fromNullable } = require('./03-either')
// generic data structures
const { Map, List } = require('immutable-ext')

// 1 + 0
// => 1

// x + 0
// => x

// neutral elem = 0
Sum.empty = () => Sum(0)

const res = Sum.empty().concat(Sum(1).concat(Sum(2)))
//=> 3

// neutral elem = true
All.empty = () => All(true)

// add more neutral element
const res2 = Sum.empty().concat(Sum(1).concat(Sum(2))).concat(All(true))
//=> 4

const sum = xs => xs.reduce((acc, x) => acc + x, 0)

sum([])
//=> 0

sum([1, 2, 3])
//=> 6

const all = xs => xs.reduce((acc, x) => acc && x, true)
all([])
//=> true

const first = xs => xs.reduce((acc, x) => acc)
// first([1, 2, 3])
//=> 1


// first([])
//=> blow up

// so monoids are safe to take as many elems as we wont even when none elems
// semi groups with none elems might not behave correctly

// how to make monids from semigroups
// Sum, ALl, were defined

const Product = x => ({
    x,
    concat: ({ x: y }) => Product(x * y)
})
Product.empty = () => Product(1)


const Any = x => ({
    x,
    concat: ({ x: y }) => Any(x || y)
})
Any.empty = () => Any(false)


const Min = x => ({
    x,
    concat: ({ x :y }) => Min(x < y ? x : y)
})
Min.empty = () => Min(Infinity)


const Max = x => ({
    x,
    concat: ({ x: y }) => Max(x > y ? x : y)
})
Max.empty = () => Max(-Infinity)

const Right = x => ({
    fold: (f, g) => g(x),
    map: f => Right(f(x)),
    concat: o => o.fold(
        e => Left(e),
        r => Right(x.concat(r)))
})

const Left = x => ({
    fold: (f, g) => f(x),
    map: f => Left(x),
    concat: o => Left(x)
})

const First = either => ({
    fold: f => f(either),
    concat: o =>
        either.isLeft ? o : First(either)
})
First.empty = () => First(Left())


const stats = List.of(
    { page: 'Home', views: 40 },
    { page: 'About', views: 10 },
    { page: 'Blog', views: 4 }
)

const res3 = stats.foldMap(x =>
    fromNullable(x.views).map(Sum), Right(Sum(0)))

// stats.map(e => console.log(e))
// res3.map(console.log)
//=> 54 Right(Sum(54))

// and if any views is undefined
// Left(null)

const find = (xs, f) =>
    List(xs)
        .foldMap(x =>
            First(f(x) ? Right(x) : Left()), First.empty())
        .fold(x => x)

const res4 = find([1, 2, 3, 4], x => x > 2)
// ...

module.exports = {
    Sum,
    Pair
}
