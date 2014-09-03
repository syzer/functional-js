/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function letercasePrecentageRatio(line, i) {
    var string = 'lowercase: ', total = 0;
    var out = countLowerUpperCase(line);
    total = out[0] + out[1];
    string += (out[0] / total * 100).toFixed(2);
    string += ' uppercase: ';
    string += (out[1] / total * 100).toFixed(2);

    return string;
}

//TODO lib
//TODO unsafe with space
function isUpperCase(char) {
    return char === char.toUpperCase()
}

//TODO unsafe with empty string
function countLowerUpperCase(string) {
    return _(string).reduce(function (sum, char) {
        isUpperCase(char) ? sum[1] += 1 : sum[0] += 1;
        return sum;
    }, [0, 0]);

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

function run(input) {
    return readLines(input, letercasePrecentageRatio);
}

module.exports.run = run;
module.exports.isUpperCase = isUpperCase;
module.exports.countLowerUpperCase = countLowerUpperCase;
