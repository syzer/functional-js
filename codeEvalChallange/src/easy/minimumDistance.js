"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function dist(a, b) {
    return Math.abs(a - b);
}

var mDist = _.memoize(dist, function (a, b) {
    //return a + '|' +b;
    return a < b ? a + '|' + b : b + '|' + a;
});

//already sorted
function median(values) {

    //values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];
    else
        return (values[half - 1] + values[half]) / 2.0;
}

// todo pure?
function minimumDistance(arr) {
    var med = median(arr);

    return arr.reduce(function (sum, curr) {
        return sum += mDist(curr, med);
    }, 0);
}

function prepare(line) {
    var data = line.split(' ').map(Number);
    // first input is not required
    data.shift();
    return minimumDistance(data.sort(function (a, b) {
        return a - b;
    }));
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
