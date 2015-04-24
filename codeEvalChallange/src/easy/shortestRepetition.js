"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function shortestRepetition(str) {
    return str
            .replace(new RegExp(str[0], 'g'), ' ')
            .substr(1)
            .indexOf(' ') + 1;
}

function prepare(line) {
    var out = shortestRepetition(line);
    return out === 0 ? line.length : out;
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
