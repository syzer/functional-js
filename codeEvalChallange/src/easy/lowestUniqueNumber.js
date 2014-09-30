/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// TODO lib
function lowestUnique(arr) {
    var lowestUnique = parseInt(_(arr).countBy().pairs().filter(function (el) {
        return el[1] === 1;
    }).flatten().value()[0]);

    if (!lowestUnique) {
        return '0';
    }
    return _.indexOf(arr, lowestUnique) + 1;
}

function prepare(lines) {
    return lowestUnique(lines.split(' ').map(Number));    //.split('\n')
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
