/**
 * Created by syzer on 9/2/2014.
 */
"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function maxRangeSum(interval, arr) {
    if (interval > arr.length) {
        interval = arr.length
    }
    var out = _(arr)
        .map(function (el, i) {
            if (i + 1 < interval) {
                return 0;
            }
            var k, sum = 0;
            for (k = 1; k <= interval; k++) {
                sum += arr[k + i - interval] || 0;
            }
            return sum; //or pull().reduce(sum)
        })
        .sortBy(function (el) {
            return -el;
        })
        .value()[0];
    return out < 0 ? 0 : out;
}

function prepare(line) {
    var data = line.split(';');
    data[0] = parseInt(data[0], 10);
    data[1] = data[1].split(' ').map(Number);
    return maxRangeSum(data[0], data[1]);
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
