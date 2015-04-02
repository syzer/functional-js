"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function simpleSorting(arr) {
    return arr.sort(function(a,b){
        return a - b;
    }).map(function(el){
        return el.toFixed(3);
    }).join(' ');
}

// first input is not required
function prepare(line) {
    return simpleSorting(line.split(' ').map(Number));
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
