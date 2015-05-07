"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

var MAX = 10001;
var MIN = 0;

function findMatch(arr, el) {
    return arr.filter(function (el2) {
        return el[1] === el2[0];
    })[0]
}

function isGoodChain(arr, traversed, i, n) {
    while (i < n) {

        var match = arr.filter(function (el2) {
            return traversed[traversed.length - 1][1] === el2[0];
        })[0];

        if (!match) {
            return 0 === arr.length && traversed.pop()[1] === MAX;
        }

        arr = _.reject(arr, match);

        traversed.push(match);
        i++;
    }
    return false;
}

function isGoodChain3(arr, traversed, i, n) {
    var match = arr.filter(function (el2) {
        return traversed[traversed.length - 1][1] === el2[0];
    })[0];

    if (!match) {
        return 0 === arr.length && traversed.pop()[1] === MAX;
    }
    arr = arr.filter(function (el2) {
        return el2[1] !== match[1] && el2[0] !== match[0];
    });

    traversed.push(match);

    return isGoodChain(arr, traversed, ++i, n);
}

function isGoodChain2(arr, traversed, i, n) {
    var match = findMatch(arr, traversed[traversed.length - 1]);

    if (!match) {
        return 0 === arr.length && traversed.pop()[1] === MAX;
    }
    arr = _.reject(arr, match);
    traversed.push(match);

    return isGoodChain(arr, traversed, ++i, n);
}

function prepare(line) {
    var input = line.split(';').map(parseInput);
    return isGoodChain(input, [[MIN, MIN]], -1, input.length) ? 'GOOD' : 'BAD';

    function parseInput(el) {
        return el.split('-').map(function (el) {
            if ('BEGIN' === el) {
                return MIN
            }
            if ('END' === el) {
                return MAX
            }
            return Number(el);
        });
    }
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
