"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function splitNumber(numbers, action, words) {
    var first = Number(numbers.substr(0, words[0].length));
    var second = Number(numbers.substr(words[0].length, words[1].length));
    if ('+' === action) {
        return first + second;
    } else {
        return first - second;
    }
}

function prepare(line) {
    var data = line.split(' ');
    var action = data[1]
        .split(/[^-|^+]+/g)
        .filter(_.negate(_.isEmpty))[0];
    return splitNumber(data[0], action, _.words(data[1], /[^-|^+]+/g));
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
