/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function isOperand(el) {
    return el === '+' || el === '/' || el === '*';
}

function polishNotation(array) {
    return array
        .reduceRight(function (stack, el) {
            if (isOperand(el)) {
                var expression = stack.shift() + el + stack.shift();
                stack.unshift(eval(expression));
            } else {
                stack.unshift(parseInt(el, 10));
            }
            return stack;
        }
        , []
    );
}

function prepare(line) {
    return polishNotation(line.split(' '))[0];
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
