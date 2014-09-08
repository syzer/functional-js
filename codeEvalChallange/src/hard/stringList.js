/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function traverseTrees(arr, length) {
    console.log(arr, arr[0][0]);
    var out = _(arr)
        .flatten()
        .groupByNrOfEl(length)
        .sortBy()
        .unique()
        .value();
//    [arr[0]
//    arr[0][1]]
//    arr[1][]
//    return out;
    console.log('\ntraversed\n', out)
}

function getCombinations(length, letters, acc) {
    // meybe of lenght
    var trees =  letters.map(function (chr, i) {
        return makeTree(letters, chr, length, [chr], 1);
    });
    console.log('\ntrees\n',trees);
    traverseTrees(trees, length);
    return trees;
}

function makeTree(letters, chr, length, tree, currLev) {
    tree = tree || [];
    console.log('\nin:', letters, chr, length, tree, currLev);
    if (length < currLev) {
        return tree;
    }
    letters.forEach(function (char) {
        //var temp = []; // maybe chr, chr, char

        tree.push([chr, char]);
    });
    console.log('\nout:',letters, chr, length, tree, currLev+1);

    return makeTree(letters, chr, length, tree, currLev + 1)
}

function stringList(line) {
    var data = line.split(',');
    var length = data[0];
    var letters = _(data[1]).unique().sortBy().value();
    return getCombinations(length, letters);
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

function run(input) {
    return readLines(input, stringList);
}

module.exports.run = run;
