"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function alphabetBlocks(data) {
    return data[1].split('').filter(function (el) {
            return -1 !== data[2].indexOf(el);
        }).length === data[1].length;
}


function prepare(line) {
    return alphabetBlocks(line.split('|').map(function (el) {
        return el.trim();
    })) ? 'True' : 'False';
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
