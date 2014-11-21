/**
 * Created by syzer on 9/2/2014.
 */
"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


// if match ok
// in not -> add _
// if next match

// if not match -> M



function applyRules(sequence, match) {
    match = sequence[1];
    sequence = sequence[0];
    return _(sequence).reduce(function (acc, curr, i) {
        console.log('\n', i, acc, curr, match[i], _.lcs(sequence, match));
        if (curr === match[i]) {
            acc[0] += 3;
            acc[1] = 0;
        } else {
            // check next matchi9ng match : ... fill with MMMMMM___
            // fill with _______
        }

        if (match[i] === '_') {
            if (acc[1] > 0) {
                acc[1] -= 1;
            } else {
                acc[0] -= 8;
            }
            acc[1] += 1;
        } else {

            if (curr !== match[i]) {
                acc[0] -= 3;
            }

        }
        return acc;
    }, [0, 0]);
}

function convertBack(integer) {
    return integer[0];
}

//TODO to lib array trim strings
function convertInput(lines) {
    return lines.split('|').map(function (el) {
        return el.trim();
    });
}

function prepare(lines) {
    return convertBack(applyRules(convertInput(lines)))
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
