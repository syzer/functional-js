/**
 * Created by syzer on 5/14/2015.
 */
"use strict";

function isogramsTrie(str) {
    str = str.toLowerCase();
    return str.split('').reduce(function (flag, curr, i) {
        if (-1 !== str.indexOf(curr, ++i)) {
            flag = false;
        }
        return flag;
    }, true);
}

// !0 => true
// ~ bitwise move so -1=>0 0=>-1
function isogramsTrie2(str) {
    str = str.toLowerCase();
    return !str.split('').filter(function (e, i) {
        return ~str.indexOf(e, ++i)
    }).length
}


function prepare(line) {
    return isogramsTrie(line);
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
