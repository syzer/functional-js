const { First, All, Sum } = require('./05-semigroup')
// geric data structures
const { Map } = require('immutable-ext')

const acc1 = {
    name: First('Nico'),
    isPaid: All(true),
    points: Sum(10),
    friends: Sum(['Agatha'])
}

const acc2 = {
    name: First('Nico'),
    isPaid: All(false),
    points: 2,
    friends: ['Arthur']
}

const res = acc1.concat(acc2)
console.log(res.toJSON());