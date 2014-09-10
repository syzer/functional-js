/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function swapCase(string) {
    return _(string)
        .map(function (chr) {
            return _.isUpperCase(chr) ? chr.toLowerCase() : chr.toUpperCase();
        })
        .value()
        .join('')
}

//function prepare(line) {
//    return parseInt(line, 16);
//}

function run(input) {
    return readLines(input, swapCase);
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
