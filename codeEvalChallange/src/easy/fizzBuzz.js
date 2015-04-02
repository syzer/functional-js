"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function fizzBuzz(fizz, buzz, howLong) {
    return _.range(1, howLong + 1).map(function (el) {
        var out = '';
        if (el % fizz === 0) {
            out += 'F';
        }
        if (el % buzz === 0) {
            out += 'B';
        } else if (el % fizz !== 0) {
            out += el;
        }
        return out;
    }).join(' ');
}

// first input is not required
function prepare(line) {
    var data = line.split(' ');
    var fizz = Number(data[0]);
    var buzz = Number(data[1]);
    var howLong = Number(data[2]);
    return fizzBuzz(fizz, buzz, howLong);
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
