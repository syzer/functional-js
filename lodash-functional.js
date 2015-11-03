const _ = require('lodash-fp');

// understanding this
var log = function () {
    return console.log(this);
};
// much evil.. wow
String.prototype.log = log;
Object.prototype.log = log;
Number.prototype.log = log;

var obj = {a: 'am'};
obj.log();
"sadas".log();
var num = 42;
num.log();

var items = [
    {'value': _.constant(['a', 'b'])},
    {'value': _.constant(['b', 'c'])}
];

var getValues = _.flow(
    _.map(_.result('value')),
    _.flatten,
    _.uniq
);

getValues(items);
// => ['a', 'b', 'c']

// shortcut fusion is supported too
var combined = _.flow(
    _.map(function (value) {
        console.log('map');
        return value * value;
    }),
    _.filter(function (value) {
        console.log('filter');
        return value % 2 == 0;
    }),
    _.take(2)
);

combined(_.range(0, 200)).log();
//=> [0,4]

_.map(num => num + 1, [0, 1, 2]).log();


