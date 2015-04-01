"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function removeCharacters(str, chars) {
    return _(str).filter(function (char) {
        return !_.contains(chars, char);
    }).value().join('');
}

// first input is not required
function prepare(line) {
    var data = line.split(',');
    data[1] = data[1].split('');
    data[1].shift();
    return removeCharacters(data[0], data[1]);
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
