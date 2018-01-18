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
