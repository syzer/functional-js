//2015/11/10
"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function numberDivisionPermutations(num, curr = 1, curr2 = 2, acc = 0, divisible = [1, 5, 10, 25, 50, 51]) {
    if (curr > 50) {
        return acc;
    }
    curr++;
    acc += curr;
    if (num % curr) {

    }


    return numberDivisionPermutations(num, curr, curr2, acc, divisible);
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
            line = _.parseInt(line);
            return lineCallback(line, i);
        })
        .join('\n');
}

module.exports.run = run;

