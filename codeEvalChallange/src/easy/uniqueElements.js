"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function uniqueElements(arr) {
    return arr.reduce(function(uniques,curr){
        if (!_.contains(uniques, curr)){
            uniques.push(curr);
        }
        return uniques;
    },[]);
    //this one works to
    //return _.unique(arr);
}

// first input is not required
function prepare(line) {
    return uniqueElements(line.split(','));
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
