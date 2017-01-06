const _ = require('lodash')
const match = _.cond([
    [_.matches({a: 1}), _.constant('matches A')],
    [_.conforms({b: _.isNumber}), _.constant('matches B')],
    [_.constant(true), _.constant('no match')]
])

match({a: 1, b: 2})
// matches A

match({a: 0, b: 1})
// matches B

match({a: 1, b: '2'})
// matches A

match({a: 42, b: '2'})
// no match
