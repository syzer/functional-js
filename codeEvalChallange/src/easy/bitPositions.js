/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// +stringifiedBitPositions :: string -> string
var stringifiedBitPositions = _.compose(stringifyTrueFalse, bitPositions);

// + stringifyTrueFalse :: boolean -> string
function stringifyTrueFalse(boolean) {
    return boolean ? 'true' : 'false';
}

// +bitPositions:: string, integer -> boolean
function bitPositions(line, i) {
    var data = line.split(',');
    var pos1 = _.parseInt(data[1]);
    var pos2 = _.parseInt(data[2]);
    var bitwise = _.toBitwise(data[0]);

    return _(bitwise).reduceRight(function (sum, char, i) {
        bitwise.length - i === pos1 ? sum = char : '';
        bitwise.length - i === pos2 ? sum = char === sum : '';
        return sum;
    }, 0);
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

function run(input) {
    return readLines(input, stringifiedBitPositions);
}

module.exports.run = run;
