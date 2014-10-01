/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function sumNumbers(numbers) {
    return numbers.reduce(function (acc, temp) {
        return acc + temp;
    }, 0)
}


function run(input) {
    return readLines(input);
}

function readLines(input, lineCallback) {
    return sumNumbers(
        input
            .split('\n')
            .map(Number)
    )
       .toString();
}

module.exports.run = run;
