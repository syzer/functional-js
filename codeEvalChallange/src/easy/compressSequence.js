"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function compressSequence(arr, arr2) {
    if (arr.length === 0) {
        return arr2;
    }

    var el = arr.shift();
    var len = _.takeWhile(arr, function (n) {
            return n === el;
        }).length + 1;
    arr.splice(0, len - 1);

    return compressSequence(arr, arr2.concat([len, el]));
}

function prepare(line) {
    return compressSequence(line.split(' ').map(Number), []).join(' ');
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
