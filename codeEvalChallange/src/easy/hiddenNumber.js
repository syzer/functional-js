"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

//48//57
////97 //122 letter
//TODO recursive for fun
function hiddenNumber(str) {
    return str.split('').reduce(function (acc, curr) {
        var num = curr.charCodeAt(0);

        if (num > 47 && num < 58) {
            return acc + curr;
        }
        if (num - 97 >= 0 && num - 97 <= 9) {
            return acc + (num - 97);
        }
        return acc;
    }, '');
}

function prepare(line) {
    var out = hiddenNumber(line);
    return out ? out : 'NONE';
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
