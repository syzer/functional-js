/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

"use strict";

function add(a, b) {
    return a + b;
}

function sumNumbers(numbers) {
    return numbers.reduce(add, 0)
}

function generatePrime(curr) {
    return curr

}

function run(input) {
    return readLines(input);
}

function readLines(input, lineCallback) {
    return sumNumbers(
        input
            .split('\n')
            .map(Number)
    )
        .toString();
}

module.exports.run = run;
