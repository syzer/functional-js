const _ = require('lodash')
const func = _.cond([
    [_.matches({'a': 1}), _.constant('matches A')],
    [_.conforms({'b': _.isNumber}), _.constant('matches B')],
    [_.constant(true), _.constant('no match')]
])

console.log(func({a: 1, b: 2}))
// → 'matches A'

console.log(func({a: 0, b: 1}))
// → 'matches B'

console.log(func({a: 1, b: '2'}))
// no matches

console.log(func({a: 42, b: '2'}))
