"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

var mIsPalindrome = _.memoize(isPalindrome);

function isPalindrome(str) {
    return reverse(str) === str;
}

function reverse(str) {
    return str.split('').reverse().join('');
}

function reverseAddPalindrome(str, n) {
    if (mIsPalindrome(str)) {
        return n + ' ' + str;
    }
    str = String(Number(str) + Number(reverse(str)));

    return reverseAddPalindrome(str, n+1);
}


function prepare(line) {
    return reverseAddPalindrome(line, 0);
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
module.exports.isPalindrome = mIsPalindrome;
