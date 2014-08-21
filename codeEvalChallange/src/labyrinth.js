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

function decode(input) {
    var lines = input.toString().split('\n');
    var array = [];
    // convert to wfee ways
    lines.forEach(function (line, i) {
        if (line != "") {
            _.forEach(line, function (char, j) {
                if (char === ' ') {
                    array.push({x: i, y: j, neighbours: []});
                }
            });
        }
    });
    console.dir(array.length);

//   //filter holes
    array = array.filter(function (el, i) {
        var important = true;
        array.forEach(function (el2, j) {
            if ((el.x === el2.x) && (Math.abs(el.y) - Math.abs(el2.y) === 1)
                || (Math.abs(el.x) - Math.abs(el2.x) === 1) && (el.y === el2.y)) {
                important = true;
                array[i].neighbours.push(el2);
            }
        });
        return important;
    });
    console.dir(array.length);
//    console.dir(array);

    var newArray = array.filter(function (el, i) {
        if (el.neighbours.length === 1) {
            return true;
        } else {
            return false;
        }
    });
    console.log(newArray[0]);
    console.log(newArray[1]);
    console.log(newArray[2]);
    console.log(newArray[1].neighbours.length);



//    console.dir(array);
    return input;
}

function run() {
    decode(input);
}

module.exports.decode = decode;
run();
