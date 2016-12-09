const { keys, compose, pickBy, is } = require('ramda')

//  methodNames :: Object -> [String]
const methodNames = compose(keys, pickBy(is(Function)))

let obj = {
    foo: true,
    bar: function () {
    },
    baz: function () {
    },
    es6() {
    }
}

methodNames(obj)
// => ['bar', 'baz', 'es6']