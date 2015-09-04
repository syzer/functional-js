"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function findTextInWords(line) {
    var words = line[0].split(' ');
    var text = line[1].trim();

    return words.map(function (word) {
        return _(text).filter(function(letter) {
            var index = word.indexOf(letter);
            if (-1 === index) {
                return false;
            }
            word = word.slice(index, 1);
            return true;
        }).value().join('') === text;
        //return (-1 === word.indexOf(text) ? '' : word);
    });
}

function prepare(line) {
    var answer = findTextInWords(line.split('|')).join('');
    console.log(answer);
    return answer ? answer : 'False';
}

function run(input) {
    return readLines(input, prepare);
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
