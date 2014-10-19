/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function multiplyLists(arr1, arr2) {
    return arr1.map(function(el, i){
        return el * arr2[i];
    });
}

function arrayToIntegers(arr) {
    return arr.map(function (el) {
        return parseInt(el, 10);
    })
}

function calculate(data) {
    return multiplyLists(data[0], data[1]);
}

function formatOutput(data) {
    return data.join(' ');
}

var executeLine = _.compose(formatOutput, calculate, prepare);
//function executeLine(line) {
//    return formatOutput(calculate(prepare(line)));
//}

// aka parse
// +prepare::string -> array[integer]
function prepare(line) {
    return _(line.split('|'))
        .map(function (el) {
            return el.trim().split(' ')
        })
        .map(arrayToIntegers)
        .value();
}

function run(input) {
    return readLines(input, executeLine);
}

function runAll(input) {
    return execute(input);
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
