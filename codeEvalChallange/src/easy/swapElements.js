/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// TODO lib
function swap(array, from, to) {
    var temp;
    temp = array[to];
    array[to] = array[from];
    array[from] = temp;
    return array;
}


function swapElements(array, fromToArr) {
    fromToArr.forEach(function (fromTo) {
        array = swap(array, fromTo[0], fromTo[1]);
    });
    return array;
}

function prepare(line) {
    var data = line.split(':');
    var array = _.compact(data[0].split(' '));
    var fromToArray = data[1]
        .split(',')
        .map(function (el) {
            return el.split('-')
                .map(function (inEl) {
                    return parseInt(inEl.trim());
                })
        });

    return swapElements(array, fromToArray).join(' ');
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
