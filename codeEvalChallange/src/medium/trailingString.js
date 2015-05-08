"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function isTrailingString(arr) {
    var posInString = arr[0].lastIndexOf(arr[1]);

    if (-1 === posInString) {
        return false;
    }

    return posInString + arr[1].length === arr[0].length;
}

function prepare(line) {
    return isTrailingString(line.split(',')) ? '1' : '0'
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
