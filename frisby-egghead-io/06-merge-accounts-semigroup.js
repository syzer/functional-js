const { First, All, Sum } = require('./05-semigroup')
// generic data structures
const { Map } = require('immutable-ext')

// Data structure is semigroup => so can concat to other groups
const acc1 = Map({
    name: First('Nico'),
    isPaid: All(true),
    points: Sum(10),
    friends: ['Agatha']
})

const acc2 = Map({
    name: First('Nico'),
    isPaid: All(false),
    points: Sum(2),
    friends: ['Arthur']
})

const res = acc1.concat(acc2)
res.toJS()