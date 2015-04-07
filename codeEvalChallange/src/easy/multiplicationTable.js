"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function multiplicationTable(x, y) {
    var row = 1;

    return _.times(y, function (n) {
        return _.range(1, x + 1);
    })
        .map(function (row, rowNo) {
            return row.map(function (el) {
                return el * (rowNo + 1);
            })
        })
        .map(function(row){
            return row.map(function (el){
                if(el<10) {
                    return el + '   ';
                } else if (el<100) {
                    return el + '  ';
                } else {
                    return el + ' ';
                }
            }).join('').trim()
        })
        //.join('\n');
}

function prepare(lines) {
    return multiplicationTable(12, 12);
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
