/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function removeRepetitions(string) {
    return string
        .split('')
        .reduce(function (acc, curr) {
            if (curr !== acc[acc.length - 1]) {
                acc += curr;
            }
            return acc;
        }, [])
}

function run(input) {
    return readLines(input, removeRepetitions);
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
