/**
 * Created by syzer on 10/22/2014.
 */
const _ = require('lodash')
const R = require('ramda')

const validUsersNamedBuzz = users =>
    _.filter(users, user => user.name === 'Buzz' && _.isEmpty(user.errors))

// Ramda style:
const validUsersNamedBuzz2 = R.filter(R.where({
    name: R.equals('Buzz'),
    errors: R.isEmpty
}))

const users = [
    {name: 'Buzz', errors: ['eat pizza'], day: 1},
    {name: 'Buzz', errors: [], day: 2}
]
_.isEqual(validUsersNamedBuzz2(users), validUsersNamedBuzz(users))
// true

// CURRIED
// `prop` takes two arguments. If I just give it one, I get a function back
const moo = R.prop('moo')
// when I call that function with one argument, I get the result.
const value = moo({moo: 'cow'})
// => 'cow'
console.log(value)

const amtAdd1Mod7 = R.compose(R.modulo(7), R.add(1), R.prop('amount'))
// we can use that as is:
console.log(amtAdd1Mod7({amount: 16})) // => 4
amtAdd1Mod7({amount: 987}) // => 1
amtAdd1Mod7({amount: 68}) // => 6

const amounts = [
    {amount: 903}, {amount: 2875654}, {amount: 6}
]
// var amountsToValue = Array.prototype.map(amtAdd1Mod7)   // ERROR!!!
const amountsToValue = R.map(amtAdd1Mod7)
amountsToValue(amounts)
// => [ 7, 7, 0 ]
