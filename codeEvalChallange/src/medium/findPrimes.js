"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

//TODO generator

var gcd = function (a, b) {
    return (!b) ? a : gcd(b, a % b);
};

var mgcb = _.memoize(gcd, function (a, b) {
    return a + ',' + b;
});

function findPrimes(limit, howMany) {
    var primes = [], n, divisor;

    outerLoop: for (n = 2; n <= limit; n++) {
        for (divisor = 2; divisor < n; divisor++) {
            if (n % divisor === 0) {
                continue outerLoop;
            }
        }
        primes.push(n);
        if (primes.length >= howMany) {
            return primes;
        }
    }
    return primes;
}

function prepare(line) {
    return findPrimes(line,  4294967295).join(',');
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
