"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function readMore(line) {
    if (line.length <= 55) {
        return line;
    }
    return _.trunc(line, {
        'length': 54,
        'separator': / ? +/,
        'omission': '... <Read More>'
    });
}

function prepare(line) {
    return readMore(line);
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
