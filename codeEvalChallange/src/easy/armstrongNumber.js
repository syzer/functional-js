"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function isArmstrong(arr, n) {
    return Number(arr) === arr.split('')
            .reduce(function (acc, el) {
                return acc + Math.pow(Number(el), n);
            }, 0);
}

function prepare(line) {
    return isArmstrong(line, line.length) ? 'True' : 'False';
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
