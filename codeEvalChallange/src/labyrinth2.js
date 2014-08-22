/**
 * Created by syzer on 8/21/2014.
 */
var _ = require('lodash');
var fs = require('fs');

// [x,y] , [x,y]
function mapDistance(el, el2) {
    return (Math.abs(el[0] - el2[0]))
        + Math.abs(el[1] - el2[1]);
}

var memorizedCartesianDistance = _.memoize(cartesianDistance, function (el, el2) {
    return [el, el2];
});

// [x,y] -> number
function cartesianDistance(el, el2) {
    return Math.pow((el2[0] - el[0]), 2) + Math.pow((el2[1] - el[1]), 2);
}

function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

function findRoutes(lines, array) {
    var routes = [];
    lines.forEach(function (line, i) {
        _.forEach(line, function (char, j) {
            if (char === ' ') {
                routes.push([j, i])
            }
        });

    });
    return routes;
}

function findAttached(node, array) {
    return _.filter(array, function (el, i) {
        if (cartesianDistance(node, el) === 1) {
            return true;
        }
    });
}

var memoizedAttachedNodes = _.memoize(findAttached);

//TODO memoize
function calcHeuristicDistances(children, visited, finishNode) {
    var distances = [];
    children.forEach(function (child) {
        if (!_.some(visited, child)) {
            distances.push({node: child, distance: cartesianDistance(child, finishNode)});
        }
    });
    return _.sortBy(distances, 'distance');
}

var memoizedCalcHeuristicDistances = _.memoize(calcHeuristicDistances);

function traverse(node, array, visited, finishNode, callback) {
    // exit condition
    if (_.some([node], finishNode)) {
        visited.push(node);
        callback(visited);
        return visited;
    }

//    var children = findAttached(node, array);
    var children = memoizedAttachedNodes(node, array);
//    var orderedChildren = calcHeuristicDistances(children, visited, finishNode);
    // 17.9 => 5s
    var orderedChildren = memoizedCalcHeuristicDistances(children, visited, finishNode);

    visited.push(node);
    orderedChildren.forEach(function (child) {
        //TODO nodes distances recalc skip
        return traverse(child.node, array, _.clone(visited), finishNode, callback);
    });
}

function findEntryPoints(array) {
    return [_.first(array), _.last(array)];
}

function decode(input) {
    var array, visited = [];
    var lines = input.toString().split('\n');
    var xLength = lines[0].length;

    // maybe cut last line
    if (lines[lines.length - 1] === '') {
        lines.pop();
    }
    var yLength = lines.length;

    array = findRoutes(lines, zeros([xLength, yLength])); // 1200+ in large example

    var entries = findEntryPoints(array);

    var answers = [], timerId;  // can find over 8 routes

    // TODO traverse return null
    traverse(entries[0], array, [], entries[1], drawBestResult);

    function drawBestResult(visited) {
//        console.log('\n', visited.length, '\n\n', reconstructOutput(lines, visited));
        answers.push({length: visited.length, answer: reconstructOutput(lines, visited)});
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            //enable to see output
//            console.log(_(answers)
//                    .min('length')
//                    .value()
//                    .answer
//            );
        }, 600);
    }

    return;
}

function reconstructOutput(lines, visited) {
    var newLines = [];

    lines.forEach(function (line, i) {
        newLines.push(_.map(line, function (char, j) {
            if (char === '*') {
                return char;
            }
            if ((char === ' ') && (_.some(visited, [j, i]))) {
                return '+';
            } else {
                return ' ';
            }
        }).join(''));
    });

    return newLines.join('\n');
}

module.exports.decode = decode;
module.exports.findEntryPoints = findEntryPoints;
module.exports.mapDistance = mapDistance;
module.exports.cartesianDistance = memorizedCartesianDistance; //cartesianDistance;
module.exports.findAttached = findAttached;
