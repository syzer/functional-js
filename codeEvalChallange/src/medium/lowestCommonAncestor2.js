"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

var tree = {
    id: 30, children: [
        {id: 52},
        {
            id: 8, children: [
            {id: 3},
            {
                id: 20, children: [
                {id: 10},
                {id: 29}
            ]
            }
        ]
        }
    ]
};


var tree = [
    [30, 30],
    [30, 8],
    [30, 52],
    [8, 3],
    [8, 20],
    [20, 10],
    [20, 29]
];

function findChildren(num1) {
    return tree.filter(function (el) {
        return el[0] === num1;
    })[0];
}

function findPathTo(num, toVisit, walked) {
    if (num === curr) {
        return walked;
    }
    toVisit = _.remove(toVisit, curr);
    return findPathTo(num,curr,);
}

function lowestCommonAncestor(arr) {
    var node1 = findChildren(20);
    console.log('node1', node1);
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
