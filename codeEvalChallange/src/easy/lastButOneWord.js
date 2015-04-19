"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function lastButOne(line) {
    return line[line.length-2];
}

function prepare(line) {
    return lastButOne(line.split(' '))
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
