"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// abuse memoization
var mContains = _.memoize(_.contains, function (arr, char) {
    return char;
});

function firstNonRepeatedChar(str) {
    mContains.cache = {};

    return str.filter(function (char, i) {
        return !mContains(str.slice(i + 1), char);
    })[0];
}

// first input is not required
function prepare(line) {
    return firstNonRepeatedChar(line.split(''));
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
