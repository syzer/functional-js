/**
 * Created by syzer on 8/25/2014.
 */

_ = require('lodash');


//var memoizedIsLetterInBoard = isLetterInArrays;

var memorizedCartesianDistance = _.memoize(cartesianDistance, function (el, el2) {
    return [el, el2];
});

// [x,y] -> number
function cartesianDistance(el, el2) {
    return Math.pow((el2[0] - el[0]), 2) + Math.pow((el2[1] - el[1]), 2);
}

// +findAttached :: [x,y] , [['ABCD']] -> array ['B', 'C', 'D']
function findAttached(node, array) {
    return _.map(array, function (line, i) {
        return _.filter(line[0], function (el, j) {
            if (cartesianDistance(node, [j, i]) === 1) {
                return true;
            }
        })
    });
}

// +isLetterInArrays :: array, array -> boolean
function isLetterInArrays(letter, array) {
    return _.some(array, function (line) {
        return _.some(line, function (string) {
            return string.indexOf(letter) !== -1;
        });
    })
}

// -> array [[x,y], [x,y]] -> array [[3, 0], [2,3]]
function whereLetterInArray(letter, array) {
    var found = [];
    _.forEach(array, function (line, j) {   // TODO arr[0]?
        _.forEach(line, function (string, i) {
            _(string).forEach(function (char, i) {
                if (char === letter) {
                    found.push([i, j]);
                }
            });
        });
    });
    return found;
}

//TODO move to lib
function rejectArrays(array, rejectArray) {
    return array.filter(function (el) {
        return !_.some(rejectArray, el);
    });
}

function isInBoard(board, word, currLetter, i, node, visited) {
    visited = visited || [];
    node = node || [];

    console.log('node', node);
    visited.push(node);

    if (i === word.length) {
        console.log ('\n FOUND!!!\n\n');
        return true;
    }

//    if (!isLetterInArrays(currLetter, board)) {
//        return;
//    }
    var walkPossibilities = whereLetterInArray(currLetter, board);
    if (_.isEmpty(walkPossibilities)) {
        return;
    }

    walkPossibilities = rejectArrays(walkPossibilities, visited);
    walkPossibilities = findAttached(node, board);
//    visited.push(x, y);
//    console.log('\n', walkPossibilities, 'v', visited);
    //TODO filter the ones that are to far

    walkPossibilities.forEach(function(node) {
        // walk[0] = x, walk [1] =y
//        console.log('node',node, visited+node);
        return isInBoard(board, word, word[i + 1], i + 1,
            node, visited);
    });


//    return isInBoard(board, word, word[i + 1], i + 1, x, y, visited.concat([x,y]));
}


function wordSearchBoard(line, i) {
    var hardcodedBoard = [
        ['ABCE'],
        ['SFCS'],
        ['ADEE']
    ];

    //console.log(line);

    return isInBoard(hardcodedBoard, line, line[0], 0) ? 'True' : 'False';
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
module.exports.isLetterInArrays = isLetterInArrays;
module.exports.findAttached = findAttached;
module.exports.rejectArrays = rejectArrays;
