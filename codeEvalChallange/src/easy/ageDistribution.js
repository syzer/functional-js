/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function ageDistribution(n, i) {
    if (n > 100 || n < 0) {
        return "This program is for humans"
    }
    if (n >= 0 && n <= 2) {
        return "Still in Mama's arms"
    }
    if (n >= 3 && n <= 4) {
        return 'Preschool Maniac'
    }
    if (n >= 5 && n <= 11) {
        return 'Elementary school'
    }
    if (n >= 12 && n <= 14) {
        return 'Middle school'
    }
    if (n >= 15 && n <= 18) {
        return 'High school'
    }
    if (n >= 19 && n <= 22) {
        return 'College'
    }
    if (n >= 23 && n <= 65) {
        return 'Working for the man'
    }
    if (n >= 66 && n <= 100) {
        return 'The Golden Years'
    }
}

function run(input) {
    return readLines(input, ageDistribution);
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
