"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function mixedContent(all) {
    var line = all
        .reduce(function (sum, el) {
            if (_.isNumeric(el)) {
                sum.numbers.push(el)
            } else {
                sum.strings.push(el)
            }
            return sum;
        }, {strings: [], numbers: []});

    if (_.isEmpty(line.strings)) {
        return line.numbers;
    }
    if (_.isEmpty(line.numbers)) {
        return line.strings;
    }

    return line.strings.join(',') + '|' + line.numbers.join(',');
}

function prepare(line) {
    return mixedContent(line.split(','));
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
