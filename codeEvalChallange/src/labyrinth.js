/**
 * Created by syzer on 8/21/2014.
 */
var fs = require('fs');
var input = fs.readFileSync(__dirname + '/labirynth.txt');
//fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
//    if (line != "") {
//        do something here
//console.log(answer_line);
//    }
//});

var _ = require('lodash');
var util = require('util');

function mapDistance(el, el2) {
    return (Math.abs(el.x - el2.x))
        + Math.abs(el.y - el2.y);
}
// TODO to test
//console.log(mapDistance({x:-1, y:-1}, {x:0, y:1}));


function decode(input) {
    var lines = input.toString().split('\n');
    var array = [];
    // convert to wfee ways
    lines.forEach(function (line, i) {
        if (line != "") {
            _.forEach(line, function (char, j) {
                if (char === ' ') {
                    array.push({x: i, y: j, neighbours: 0});
                }
            });
        }
    });
    //TODO to test
    console.log(array.length);

//   //filter holes
    // count neibours
    array = array.filter(function (el, i) {
        var important = true;
        array.forEach(function (el2, j) {
            if (mapDistance(el, el2) === 1) {
                important = true;
                array[i].neighbours += 1; //.push(el2);
            }
        });
        return important;
    });
    console.log(JSON.stringify(array[27], null, 4));
    console.log('first:', array[0]);
    console.log('last:', array[array.length - 1]);
//    console.dir(array[27].neighbours[0]);
//    console.dir(array.length);
//    console.dir(array);

    // filter dead eands
    array = array.filter(function (el, i) {
        return el.neighbours > 1 || isEntranceOrExit(el, i, array) ? true : false;
    });

    var current = array.length - 1;

    //TODO while
//    while (current<array.lenght) {
//    }

    for (var i = 0; i <= 300; i++) {
        // recout neighbours
        array = array.map(function (el) {
            el.neighbours = 0;
            return el;
        });

        // count neighbours
        array = array.filter(function (el, i) {
            var important = true;
            array.forEach(function (el2, j) {
                if (mapDistance(el, el2) === 1) {
                    important = true;
                    array[i].neighbours += 1; //.push(el2);
                }
            });
            return important;
        });

        // filter dead eands
        array = array.filter(function (el, i) {
            return el.neighbours > 1 || isEntranceOrExit(el, i, array) ? true : false;
        });
    }

    console.log(array.length);
    console.log('first:', array[0]);
    console.log('second:', array[1]);
    console.log('last:', array[array.length - 1]);
    console.log('last but one:', array[array.length - 2]);


    var joints = array.filter(function (el) {
        if (el.neighbours >= 3) {
            return true
        }
    });

    var exit = _.last(array);

    joints = joints.map(calcHeuristic);

    function calcHeuristic(el, i) {
        el.heuristic = cartesianDistance(el, exit);
        return el;
    }

    function cartesianDistance(el, el2) {
        return (el2.x - el.x) ^ 2 + (el2.y - el.y) ^ 2
    }

    // TODO remove joins out where hash function is bigger
    // remove atached to jointsthen join.heuristic
    var attachedToJoints = array.filter(function (el, i) {
        // if atached
        joints.forEach(function (el2, j) {
            if (mapDistance(el, el2) === 1) {
                return true;
            }
        })
    });
    console.log(joints);


//    console.log(joints);


    console.log(reconstructOutput(lines, array));

//    console.dir(array);
    return input;
}


function reconstructOutput(lines, array) {
    var newLines = [];

    lines.forEach(function (line, i) {
        if (line != "") {
            newLines.push(_.map(line, function (char, j) {
                if (char === '*') {
                    return char;
                }
                if ((char === ' ') && (_.some(array, {x: i, y: j}))) {
                    return '+';
                } else {
                    return ' ';
                }
            }).join(''));
        }
    });

    return newLines.join('\n');
}

// first or last
function isEntranceOrExit(el, i, array) {
    if (i === 0) {
        return true;
    }
    if (el === _.last(array)) {
        return true;
    }
    return false;
}

function run() {
    decode(input);
}

module.exports.decode = decode;
run();
