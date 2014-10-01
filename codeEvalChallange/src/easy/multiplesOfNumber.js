/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function multiplesOfNumber(num, curr, multiple) {
    if (curr * multiple >= num) {
        return curr * multiple;
    }
    return multiplesOfNumber(num, curr, multiple + 1);
}

function prepare(line) {
    var data = line.split(',').map(Number);
    return multiplesOfNumber(data[0], data[1], 2);
}

function run(input) {
    return readLines(input, prepare);
}

function runAll(input) {
    return prepare(input);
}

function readLines(input, lineCallback) {
    return input
        .split('\n')
        .map(function (line, i) {
            if ('' === line) {
                return;
            }
            return lineCallback(line, i);
        })
        .join('\n');
}

module.exports.run = run;
module.exports.runAll = runAll;
