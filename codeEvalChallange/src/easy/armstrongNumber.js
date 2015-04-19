"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function isArmstrong(arr, n) {
    return Number(arr.join('')) === arr
            .map(function (el) {
                return Math.pow(Number(el), n)
            })
            .reduce(function (acc, el) {
                return acc + el;
            });
}

function prepare(line) {
    return isArmstrong(line.split(''), line.length) ? 'True' : 'False';
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
