#!/usr/bin/env node

const Either = require('./03-either')
const { Left, Right, fromNullable } = require('./03-either')
const Task = require('data.task')
const Box = require('./01-boxing')
const { List, Map } = require('immutable-ext')

// isomorphism :
// NOT runing code on client or server
// given from(), to():
// from(to(x)) = x
// to(from(y)) = y
// convert and convert back
// 2 datatype holds same information


// ex: String ~ [Char]
const Iso = (to, from) => ({
    to,
    from
})

const chars = Iso(s => s.split(''), c => c.join(''))

const res = chars.from(chars.to('hello world'))
console.log(res)

const truncate = str =>
    chars.from(chars.to(str).slice(0, 3).concat('...'))
console.log(truncate('hello world'))

// ex: [a] ~ Either null a
const singleton = Iso(
    e => e.fold(() => [], x => [x]),
    ([x]) => x ? Right(x) : Left())

const filterEither = (e, pred) =>
    singleton.from(singleton.to(e).filter(pred))

// it holds only id in mathes /h/
const res2 = filterEither(Right('hello'), x => x.match(/h/ig))
    .map(x => x.toUpperCase())
// Right(HELLO)

const res3 = filterEither(Right('ello'), x => x.match(/h/ig))
    .map(x => x.toUpperCase())
// Left(undefined)
