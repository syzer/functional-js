/**
 * Created by syzer on 8/25/2014.
 */

var _ = require('lodash');
var lib = require('./../lib/lib')(_);

var memorizedCartesianDistance = lib.mCartesianDistance;
var pushIfNonEmpty = lib.pushIfNonEmpty;
var rejectArrays = lib.rejectArrays;
var whereLetterInArray = lib.whereLetterInArrayExample;
var memorizedWhereLetterInArray = whereLetterInArray;
var memoizedWhereLetterInArrays  = lib.mWhereLetterInArrays;

function isInBoard(board, word, currLetter, i, node, visited) {
    visited = visited || [];

    pushIfNonEmpty(visited, node);

    if (i === word.length) {
        return true;
    }

    var walkPossibilities = memoizedWhereLetterInArrays(currLetter, board);

    //reject visited
    walkPossibilities = rejectArrays(walkPossibilities, visited);

    walkPossibilities = walkPossibilities.filter(function (toVisit) {
        if (node) {
            return memorizedCartesianDistance(node, toVisit) <= 1;
        }
        return true;
    });

    return walkPossibilities.map(function (node) {
        return isInBoard(
            board, word, word[i + 1], i + 1, node, _.clone(visited)
        );
    });
}

function wordSearchBoard(line, i) {
    var hardcodedBoard = [
        ['ABCE'],
        ['SFCS'],
        ['ADEE']
    ];

    var humanize = _.compose(_.any, _.uniq, _.flatten);

    return humanize(isInBoard(hardcodedBoard, line, line[0], 0)) ? 'True' : 'False';
}

function run(input) {
    return readLines(input, wordSearchBoard);
}

function readLines(input, lineCallback) {
    return _.map(input.split('\n'), function (line, i) {
        if ('' === line) {
            return;
        }
        return lineCallback(line, i);
    }).join('\n');
}

module.exports.run = run;
module.exports.whereLetterInArray = whereLetterInArray;
module.exports.rejectArrays = rejectArrays;
module.exports.whereLetterInArraysReduce = memoizedWhereLetterInArrays;

