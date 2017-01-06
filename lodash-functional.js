const _ = require('lodash-fp')

// understanding this
const log = function () {
    return console.log(this)
}
// much evil.. wow
String.prototype.log = log
Object.prototype.log = log
Number.prototype.log = log

const obj = {a: 'am'}
obj.log()
'sadas'.log()
const num = 42
num.log()

const items = [
    {value: _.constant(['a', 'b'])},
    {value: _.constant(['b', 'c'])}
]

const getValues = _.flow(
    _.map(_.result('value')),
    _.flatten,
    _.uniq
)

getValues(items)
// => ['a', 'b', 'c']

// shortcut fusion is supported too
const combined = _.flow(
    _.map(value => {
        console.log('map')
        return value * value
    }),
    _.filter(value => {
        console.log('filter')
        return value % 2 == 0
    }),
    _.take(2)
)

const combined2 = _.flow(
    _.map(value => value * value),
    _.filter(value => value % 2 == 0),
    _.take(2)
)

combined(_.range(0, 200)).log()
combined2(_.range(0, 200)).log()
// => [0,4]

_.map(num => num + 1, [0, 1, 2]).log()

