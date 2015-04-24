"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

var mHappyNumber = _.memoize(happyNumber);

function happyNumber(num, chain) {
    if (num === 1) {
        return '1';
    }
    if (-1 !== chain.indexOf(num)) {
        return '0';
    }

    chain.push(num);

    var sum = Number(num)
        .toString()
        .split('')
        .map(function (el) {
            return Math.pow(Number(el), 2);
        })
        .reduce(function (a, b) {
            return a + b;
        });

    return happyNumber(sum, chain);
}

function prepare(line) {
    return happyNumber(Number(line), []);
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
