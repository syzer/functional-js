/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// '3' -> '03'
// +to2Digit :: number -> string
function to2Digit(number) {
    number = Math.floor(number);
    if (number < 10) {
        number = '0' + number;
    }
    return number;
}

// +niceAngles :: string->string
function niceAngles(angle) {
    var out = Math.floor(angle);
    var rest = angle - out;
    out += '.';
    var minutes = rest * 60;
    minutes = Math.floor(minutes);
    out += to2Digit(minutes) + "'";
    rest = (rest * 60 - minutes) * 60;
    rest = to2Digit(rest);
    out += rest + '"';

    return out;
}

function run(input) {
    return readLines(input, niceAngles);
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
