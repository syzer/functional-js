"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// parent child
var tree = [
    [30, 30],
    [30, 8],
    [30, 52],
    [8, 3],
    [8, 20],
    [20, 10],
    [20, 29]
];

function findParents(num1, walked) {
    if (num1 === 30) {  // top magic number
        if (_.isEmpty(walked)) {
            return [30]
        }
        return walked;
    }

    var parent = tree.filter(function (el) {
        return el[1] === num1;
    })[0][0];

    walked.push(parent);

    return findParents(parent, walked);
}

function lowestCommonAncestor(arr) {
    var parents1 = findParents(arr[0], []);
    var parents2 = findParents(arr[1], []);
    console.log(parents1, parents2);

    var lowestCommonAncestor = _.flowRight(_.first, _.intersection);

    return lowestCommonAncestor(parents1, parents2);
}

function prepare(line) {
    return lowestCommonAncestor(line.split(' ').map(Number));
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
