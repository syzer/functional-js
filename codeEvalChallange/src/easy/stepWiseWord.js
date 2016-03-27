"use strict";

const times = (i, char) =>
    new Array(i + 1).join(char)

const maxIn = (arr) =>
    arr.indexOf(Math.max.apply(Math, arr))

function stepWiseWord(words) {
    const arr = words.map(word => word.length)

    return words[maxIn(arr)]
        .split('')
        .reduce((prev, curr, i) =>
            `${prev} ${times(i, '*')}${curr}`
        )
}

function prepare(line) {
    return stepWiseWord(line.split(' '))
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
        .map((line, i) => {
            if ('' === line) return

            return lineCallback(line, i)
        })
        .join('\n')
}

module.exports.run = run;
module.exports.runAll = runAll;
