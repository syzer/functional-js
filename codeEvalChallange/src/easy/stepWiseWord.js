"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function times(i, char) {
    return new Array(i + 1).join(char)
}

function maxIn(arr) {
    return arr.indexOf(Math.max.apply(Math, arr));
}

function stepWiseWord(words) {
    var arr = words.map(function (word) {
        return word.split('').reduce(function (prev, curr) {
            return prev + 1
        }, 0)
    });

    return words[maxIn(arr)]
        .split('')
        .reduce(function (prev, curr, i) {
            return prev + ' ' + times(i, '*') + curr
        });
}

function prepare(line) {
    return stepWiseWord(line.split(' '))
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
