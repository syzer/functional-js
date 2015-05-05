"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function isSelfDescribingNumber(arr) {
    return arr.reduce(hasNumber, true);

    function hasNumber(acc, el, i) {
        function isI(el2, i2) {
            return i === el2;
        }
        if (el === arr.filter(isI).length) {
            return acc;
        }
        return false;
    }
}

function prepare(line) {
    return isSelfDescribingNumber(line.split('').map(Number)) ? '1' : '0';
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
