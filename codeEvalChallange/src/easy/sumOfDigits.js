/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function sumOfDigits(line, i) {
    return _(line).reduce(function(sum,el){
        return sum + parseInt(el);
    },0);
}

function run(input) {
    return readLines(input, sumOfDigits);
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
