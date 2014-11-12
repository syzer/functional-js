/**
 * Created by syzer on 9/2/2014.
 */
"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


//TODO to lib as cyclical cart distance from string
//       0  1  2  3  4
//       5  6  7  8  9
//      10 11 12 13 14
// |i-m|>0
// i | i-m-1 | i-m | i-m+1 | i-1   | i+1   | i+m-1   | i+m  | i+m+1
// 9                               (i+1)%m=0
// 5                        (i+1)%m=1   (i+1)%m=1
// 6
// 4                 i+1%m=0
function getCartesian(i, n, m, data) {
    var out = [
        1 === (i + 1) % m ? null : data[i - m - 1],
        data[i - m],
        0 === (i + 1) % m ? null : data[i - m + 1],
        1 === (i + 1) % m ? null : data[i - 1],
        0 === (i + 1) % m ? null : data[i + 1],       // on right boundary
        1 === (i + 1) % m ? null : data[i + m - 1],  // LEFT BOUNDARY
        data[i + m],
        0 === (i + 1) % m ? null : data[i + m + 1]
    ];
    //if (i === 0) {
    //    console.log(i, i + m, i + m + 1, n, m, out);
    //}
    return out;
}


// lol
function countNearBombs(i, n, m, data) {
    return getCartesian(i, n, m, data)
        .reduce(function (acc, curr) {
            if ('*' === curr) {
                return acc + 1;
            }
            return acc;
        }, 0);
}

function calculate(data) {
    var n = data[0];
    var m = data[1];

    return _(data[2])
        .map(function checkBombs(el, i) {
            if ('*' === el) {
                return el;
            }
            //if (i === 0) {
            //    console.log('\n\nd:', countNearBombs(i, n, m, data[2]))
            //}
            return countNearBombs(i, n, m, data[2]);
        })
        .value();
}

function formatOutput(data) {
    return data.join('');
}

//function executeLine(line) {
//    return formatOutput(calculate(prepare(line)));
//}
var executeLine = _.compose(formatOutput, calculate, prepare);

// aka parse
// +prepare::string -> array[integer]
function prepare(line) {
    return _([line.split(';')])
        .map(function (el) {
            return [parseInt(el[0][0]), parseInt(el[0][2]), el[1]]
        })
        .first()
}

function run(input) {
    return readLines(input, executeLine);
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
