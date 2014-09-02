/**
 * Created by syzer on 8/30/2014.
 */

var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function countNumberOnes(line, i) {
    return _(_.parseInt(line).toString(2)).reduce(function (sum, digit) {
        return sum + _.parseInt(digit);
    }, 0);
}

function run(input) {
    return readLines(input, countNumberOnes);
}

function readLines(input, lineCallback) {
    return _.map(input.split('\n'), function (line, i) {
        if ('' === line) {
            return;
        }
        return lineCallback(line, i);
    }).join('\n');
}

module.exports.run = run;
