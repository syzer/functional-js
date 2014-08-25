/**
 * Created by syzer on 8/23/2014.
 */

_ = require('lodash');

function toTitleCase(string) {
    return string.replace(/\w+/g,
        function (w) {
            return w[0].toUpperCase() + w.slice(1)/*.toLowerCase()*/;
        })
}

function toPascalCase(string) {
    return string.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) {
            return g1.toUpperCase() + g2.toLowerCase();
        });
}

function validateEmail(line, i) {
    return toTitleCase(line);
}

function run(input) {
    return readLines(input, validateEmail);
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
