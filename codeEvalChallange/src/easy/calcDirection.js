"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function calcHeading(x1, y1, x2, y2) {
    var out = '';
    if (x1 === x2 && y1 === y2) {
        return 'here';
    }
    if (y2 > y1) {
        out += 'N';
    }
    if (y2 < y1) {
        out += 'S';
    }
    if (x2 > x1) {
        out += 'E'
    }
    if (x2 < x1) {
        out += 'W';
    }
    return out;
}

function prepare(line) {
    var data = line.split(' ').map(Number);
    return calcHeading(data[0], data[1], data[2], data[3]);
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
