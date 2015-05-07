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

function isValidParenthesis(str) {
    return str.reduce(function (open, el) {
        if (isClosingTag(el)) {
            if (el === closingTag(open[open.length - 1])) {
                open.pop();
            } else {
                open.push('X'); // special char no closing to match
            }
        } else {
            open.push(el);
        }
        return open;
    }, []).length ===0;
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
    return isValidParenthesis(line.split('')) ? 'True' : 'False'
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
