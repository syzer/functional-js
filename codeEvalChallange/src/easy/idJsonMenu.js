"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function idJsonMenu(menu) {
    return menu.items.reduce(function (sum, el) {
        if (el && el.label) {
            sum += el.id;
        }
        return sum;
    }, 0)
}

function prepare(line) {
    return idJsonMenu(JSON.parse(line).menu);
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
