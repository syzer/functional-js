"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function findCycle(arr) {
    var i = 1;
    while (i < arr.length) {
        var cycle = arr.slice(i).indexOf(arr[i - 1]);
        if (-1 !== cycle) {
            return arr.splice(i - 1, cycle + 1);
        }
        i++;
    }
}

function findCyclical(arr) {
    return arr.filter(function (el, i) {
        return -1 !== arr.slice(i + 1).indexOf(arr[i])
    })
}

function prepare(line) {
    return findCycle(line.split(' ')).join(' ');
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
