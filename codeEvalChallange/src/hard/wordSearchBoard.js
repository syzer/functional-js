/**
 * Created by syzer on 8/25/2014.
 */

_ = require('lodash');


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

var memorizedWhereLetterInArray = whereLetterInArray;

// TODO to map
// -> array [[x,y], [x,y]] -> array [[3, 0], [2,3]]
function whereLetterInArray(letter, array) {
    var found = [];
    _.map(array, function (line, j) {
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

//TODO lib
var memoizedWhereLetterInArrays  = _.memoize(whereLetterInArraysReduce);

//TODO lib
// +whereLetterInArrayReduce:: char, array:strings, -> array:integer,integer
function whereLetterInArrayReduce(letter, line, lineNo) {
    return _(line[0]).reduce(function (lineResult, char, i) {
        if (char === letter) {
            lineResult.push([i, lineNo]);
        }
        return lineResult;
    }, []);
}

//TODO lib
function pushIfNonEmpty(array, el) {
    if (el && !_.isEmpty(el)) {
        array.push(el);
    }
    return array;
}

//TODO lib
// gives cartesian representance of existence of letter
// +whereLetterInArraysReduce:: string ('C'), array (['ABC'], ['FGC]) -> array [[0,2], [1,2]]
function whereLetterInArraysReduce(letter, array) {
    return _(array)
        .chain()
        .reduce(function (arrayResult, line, lineNo) {
            pushIfNonEmpty(
                arrayResult,
                whereLetterInArrayReduce(letter, line, lineNo)
            );

            return arrayResult;
        }, [])
        .flatten(true)      // shallow flatten because is wrapped in extra []
        .value()
}


//TODO move to lib
function rejectArrays(array, rejectArray) {
    return array.filter(function (el) {
        return !_.some(rejectArray, el);
    });
}

function isInBoard(board, word, currLetter, i, node, visited) {
    visited = visited || [];

    if (node) {
        visited.push(node);
    }

    if (i === word.length) {
        return true;
    }

//    var walkPossibilities = memorizedWhereLetterInArray(currLetter, board);
    var walkPossibilities = memoizedWhereLetterInArrays(currLetter, board);

    //reject visited
    walkPossibilities = rejectArrays(walkPossibilities, visited);

    walkPossibilities = walkPossibilities.filter(function (toVisit) {
        if (node) {
//            console.log(node, toVisit, cartesianDistance(node, toVisit));
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
module.exports.isLetterInArrays = isLetterInArrays;
module.exports.findAttached = findAttached;
module.exports.rejectArrays = rejectArrays;
module.exports.whereLetterInArraysReduce = memoizedWhereLetterInArrays;

