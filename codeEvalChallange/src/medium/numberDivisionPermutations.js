//2015/11/10
"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function numberDivisionPermutations(line, divisible = [1, 5, 10, 25, 50]) {
    var num = _.parseInt(line);


    return num;
}

function run(input) {
    return readLines(input, numberDivisionPermutations);
}

function readLines(input, lineCallback) {
    return input
        .split('\n')
        .map((line, i) => {
            if ('' === line) {
                return;
            }
            return lineCallback(line, i);
        })
        .join('\n');
}

module.exports.run = run;

