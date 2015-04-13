"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function findWriter(str, numbers) {
    return numbers.map(function (nr) {
        return str[nr-1];
    }).join('');
}

function prepare(line) {
    var data = line.split('|');
    return findWriter(data[0], data[1].trim().split(' ').map(function (el) {
        return parseInt(el, 10);
    }));
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
