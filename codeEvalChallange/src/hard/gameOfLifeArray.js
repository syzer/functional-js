/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);



function decideFate(el, neighbours) {
    if (el[0] && neighbours < 2) {
        el[0] = 0;
    }
    if (el[0] && neighbours > 3) {
        el[0] = 0;
    }
    if (el[0] && neighbours === 3) {
        el[0] = 1;
    }
    return el;
}

function generationNext(board) {
    return board
        .map(function (row,j) {
            return row.map(function(el, i) {
                el[1] = findAliveNeighbours([i,j], board).length;
                return el;
            });
        })
        .map(function (row) {
            return row.map(function(el){
                return decideFate(el, el[1]);
            })
        })
}

function gameOfLifeGeneration(n, board, currGen) {
    currGen = currGen || 1;
    if (currGen === n) {
        return board;
    }
    return gameOfLifeGeneration(n, generationNext(board), currGen + 1)
}

function findAliveNeighbours(el, board) {
    return findNeighbours(el, board)
        .filter(function (el) {
            return el[0] === 1
        });
}

// el [x,y]
//TODO filter
function findNeighbours(from, board) {
    var neibours = [];
    board.forEach(function(row,j){
        row.forEach(function(to, i) {
            var dist = _.cartesianDistance(from, [i,j]);
            if (dist <= 2 && dist !== 0) {
                neibours.push(to);
            }
        })
    });
    return neibours;
//    return board.filter(function (neib, j) {
//        var dist = _.cartesianDistance(el, neib);
//        return dist <= 2 && dist !== 0;
//    })
}

// return all cells
function convertToArray(lines) {
    return lines
            .split('\n')
            .map(function (line, j) {
                return _(line)
                    .map(function (char, i) {
                        if (char === '*') {
                            return [1, 0];
                        }
                        return [0, 0];
                    })
                    .value();
            });
}

function convertBack(array) {
    return _(array)
        .map(function (row) {
            return row.map(function(el){
                return el[0] ? '*' : '.';
            });
        })
        .map(function(row){
            return row.join('');
        })
        .tap(console.log)
        .join('\n')
}

function prepare(lines) {
    return convertBack(gameOfLifeGeneration(10, convertToArray(lines)))
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
module.exports.runAll = runAll;
module.exports.convertToArray = convertToArray;
module.exports.findNeighbours = findNeighbours;
module.exports.findAliveNeighbours = findAliveNeighbours;
module.exports.generationNext = generationNext;
