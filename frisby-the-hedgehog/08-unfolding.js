const { All, Sum } = require('./07-monoids')
const { Box } = require('./01-boxing')
const { fromNullable } = require('./03-either')
// generic data structures
const { Map, List } = require('immutable-ext')

const res = List.of(Sum(1), Sum(2), Sum(3))
// .reduce((acc, curr) => acc.concat(curr), Sum.empty())
    .fold(Sum.empty())


const res2 = Map({ lukas: 3, andrii: 5 })
    .map(Sum)  // wrap into monoid
    .fold(Sum.empty())

// shorthand for fold and map
const res3 = Map({ lukas: 3, andrii: 5 })
    .foldMap(Sum, Sum.empty())

// console.log(res)
// console.log(res2)
// console.log(res3)

// function that eventually returns value
const LazyBox = g => ({
    fold: f => f(g()),
    map: f => LazyBox(() => f(g())),
})

const res4 = LazyBox(() => '   72 ')
    .map(s => s.trim())
    .map(trimmed => Number(trimmed))
    .map(n => n + 1)
    .map(n => String.fromCharCode(n))
    .fold(x => x.toLowerCase())

// console.log(res4)