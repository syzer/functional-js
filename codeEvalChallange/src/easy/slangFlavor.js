"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function isPunctuation(char) {
    return '.' === char || '!' === char || '?' === char;
}

var coolLines = [
    ', yeah!',
    ', this is crazy, I tell ya.',
    ', can U believe this?',
    ', eh?',
    ', aw yea.',
    ', yo.',
    '? No way!',
    '. Awesome!'
];

function slangFlavor(lines) {
    var i = 0;
    var j = -1;
    return _(lines).reduce(function (sum, char) {
        if (isPunctuation(char)) {
            i++;
            // every other
            if (i % 2 === 0) {
                j++;
                return sum + coolLines[j % coolLines.length];
            }
        }
        return sum + char;
    }, '');

}

function prepare(lines) {
    return slangFlavor(lines);
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
