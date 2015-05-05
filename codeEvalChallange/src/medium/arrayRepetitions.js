"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function arrayRepetition(arr) {
    var sum = arr.reduce(function (a, b) {
        return a + b;
    });
    var sum2 = ((arr.length) / 2) * (arr.length - 1);

    return Math.abs(sum2 - sum - arr.length + 1);
}

function prepare(line) {
    return arrayRepetition(line.split(';')[1].split(',').map(Number));
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
