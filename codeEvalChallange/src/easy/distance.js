/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function trueCartesianDistance(el, el2) {
    return Math.sqrt(Math.pow((el2[0] - el[0]), 2) + Math.pow((el2[1] - el[1]), 2));
}

function removeNonNumeric(string) {
    return string.replace(/[^0-9\.-]+/g, "");
}

// arr[strings] -> arr[integers]
function leaveJustNumbers(arr) {
    return arr.map(function (el) {
        if ('object' === typeof el) {
            return leaveJustNumbers(el);
        }
        return parseInt(removeNonNumeric(el), 10);
    });
}

function prepare(line) {
    var data = line.split(') (');
    data = data.map(function (el) {
        return el.split(',')
    });
    data = leaveJustNumbers(data);

    return trueCartesianDistance(data[0], data[1]);
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
