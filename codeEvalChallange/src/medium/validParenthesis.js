"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function closingTag(char) {
    return {
        '(': ')',
        '{': '}',
        '[': ']'
    }[char];
}

function isClosingTag(c) {
    return c === ')' || c === ']' || c === '}';
}

// array, string => array
function notMatchingTags(openTags, tag) {
    if (isClosingTag(tag)) {
        if (tag === closingTag(openTags[openTags.length - 1])) {
            openTags.pop();
        } else {
            openTags.push('X'); // special char no closing to match
        }
    } else {
        openTags.push(tag);
    }
    return openTags;
}

function isValidParenthesis(str) {
    return str.split('').reduce(notMatchingTags, []).length === 0;
}
//function isValidParenthesis(str) {
//    if (!str) {
//        return true;
//    }
//    var index = str.lastIndexOf(closingTag(str.charAt(0)));
//
//    if (index !== str.length - 1) {
//        return false;
//    }
//
//    return isValidParenthesis(str.substring(1, str.length - 1));
//}

function prepare(line) {
    return isValidParenthesis(line) ? 'True' : 'False'
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
