"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function roadTrip(arr) {
    var out = [arr[0]];

    arr.reduce(function(prev, curr) {
        out.push(curr-prev);
        return curr;
    });

    //var lastCity = 0;
    //var out = [];
    //for (var i = 0; i < arr.length; i++) {
    //    out.push(arr[i] - lastCity);
    //    lastCity = arr[i];
    //}

    return out;
}

function prepare(line) {
    return roadTrip(line
            .split(';')
            .map(function (el) {
                return Number(el.split(',')[1])
            })
            .slice(0, -1)
            .sort(function (a, b) {
                return Number(a) - Number(b);
            })
    );
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
