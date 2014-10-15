/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// gives sorted intersection
function intersection(left, right) {
    return _.intersection(left, right);
}

function toDigit(num) {
    return parseInt(num, 10);
}

function prepare(line) {
    var data = line.split(';');

    if (_.isEmpty(line)) {
        return '';
    }

    return intersection(
        data[0].split(',').map(toDigit),
        data[1].split(',').map(toDigit)
    );
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
