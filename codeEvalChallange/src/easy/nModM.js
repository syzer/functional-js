/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function modulo(n, m, hadRunBefore) {
    if (n < m) {
        return n;
    }
    return modulo(n - m, m, true);
}

function nModM(line) {
    return modulo(
        parseInt(line.split(',')[0]),
        parseInt(line.split(',')[1])
    );
}

function run(input) {
    return readLines(input, nModM);
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
