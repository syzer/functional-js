/**
 * Created by syzer on 8/23/2014.
 */

_ = require('lodash');


function stackImplementation(line, i) {
    line = line.split(' ');
    return _(line).filter(function (el, j) {
        return ((line.length + j) % 2);
    }).reverse().join(' ');
}

function run(input) {
    return readLines(input, stackImplementation);
}

function readLines(input, lineCallback) {
    return _.map(input.split('\n'), function (line, i) {
        if ('' === line) {
            return;
        }
        return lineCallback(line, i);
    }).join('\n');
}

module.exports.run = run;
