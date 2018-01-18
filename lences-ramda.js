/**
 * Created by syzer on 18/1/23.
 */

// Access deep structure with similar code, can be done also with Maybe
const R = require('ramda')
var xLens = R.lensProp(R.path(['z']))
var xLens = R.lensPath(['z', 'a'])

const obj = { x: 1, y: 2, z: { a: 42 } }

R.view(xLens, obj)              //=> 42
//R.set(xLens, 4, obj)          //=> {"x": 1, "y": 2, "z": {"a": 4}}
//R.over(xLens, R.negate, obj)  //=> {"x": 1, "y": 2, "z": {"a": -42}}

const isTruthy = e => Boolean(e)
const isFalsy = R.complement(isTruthy)

const objs = [
  obj,
  { x: 1 }  // no crash !
]

R.pipe(
  R.map(R.view(xLens)),
  R.reject(isFalsy),
)(objs)


// lences composition
const o = { x: { y: 1 }, y: 2 }

const x = R.lensProp('x')
const y = R.lensProp('y')

R.view(x, o)  // => { y: 1 }
R.view(y, o)  // => 2

R.view(R.compose(x, y), o)  // => 1

// lences composition
const o2 = { x: { }, y: 2 }

const x2 = R.lensPath('x')
const y2 = R.lensPath('y')

R.view(x2, o2)  // => undefined
R.view(y2, o2)  // => 2

// YOU can compose lens
R.view(R.compose(y2, x2), o2)  // => undefined

var dotPath = R.useWith(R.path, [R.split('.')]);
var propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of])
var obj2 = {
  x: 2,
  a: { x: 1 }
}

propsDotPath(['a.x', 'x', 'z'], obj2) // [1, 2]

const firstPath = R.pipe(propsDotPath, R.reject(R.isNil), R.head)
// (['x', 'a.x'])

// firstPath(['x', 'a.x'], obj2)
