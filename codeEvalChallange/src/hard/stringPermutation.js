/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function permuteAndSort(array) {
    return _(_.permute(array))
//        .permute()
        .map(function(el) {
            return el.join('');
        })
        .sortBy()
        .value();
//    return _(array)
//        .permute()
//        .map(function(el) {
//            return el.join('');
//        })
//        .sortBy()
//        .value();
}

function prepare(line) {
    return permuteAndSort(line.split('')).join(',');
}

function run(input) {
    return readLines(input, prepare);
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
