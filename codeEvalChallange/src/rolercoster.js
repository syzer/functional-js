/**
 * Created by syzer on 8/22/2014.
 */
var _ = require('lodash');
var fs = require('fs');

function isLetter(char) {
    var letter = char.charAt(0).toUpperCase();
    return letter.toLowerCase() !== letter;
}

function encode(input) {
    var i;
    return _.map(input.split('\n'), function (line, i) {
        i = 0;
        return _.map(line, function (char, j) {
            if( isLetter(char)) {
                i += 1;
            }
            if (i % 2) {
                return char.toUpperCase();
            }
            return char.toLowerCase();
        }).join('');
    }).join('\n');
}

module.exports.encode = encode;
module.exports.isLetter = isLetter;
