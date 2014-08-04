/**
 * Created by syzer on 8/3/2014.
 */
/**You are an analyst for the Central Intelligence Agency and you've intercepted an top secret encrypted message which contains numbers. Each number is obtained by taking an ASCII code of the original character and adding some unknown constant 'n'.

 For example, you could encrypt the word 'test' with the condition that 'n'= 11
 'test' to ASCII -> 116 101 115 116 -> add 'n' to each number-> 127 112 126 127

 Based on previous intelligence reports, you know that the original message includes two identical words consisting of 'x' characters and the last letter in the word is known.
 Your challenge is to decrypt the message.
 Input sample:
 Your program should accept as its first argument a path to a filename.
 Each line of input consists of 3 parts: length of a word which is repeated twice, the last letter of this word, an encrypted message separated with space:
 Output sample:
 For each line of input print out decrypted message:
 Submit your solution in a file (some file name).(py2| c| cpp| java| rb| pl| php| tcl| clj| js| scala| cs| m| py3| hs| go| bash| lua) or use the online editor.
 */
var _ = require('lodash');
var encode = require('./decrypt').encode;



//1. array to ram
//2. determine space (selectMostPopularChar)
//3. determine shift
//4. map/reduce shifted answer
function decode(input, howManyCharToReject) {
    var SPACE = 32;
    howManyCharToReject = howManyCharToReject || 8;
    input = input.substring(howManyCharToReject).split(' ');

    var shift = mostPopularNumber(input) - SPACE;

    return input.map(function (char) {
        return String.fromCharCode(char - shift);
    }).join('');
}

/**
 * histogram of all populars letters
 * @param string  : caption to convert
 * @param allUpper : if to upercase all letters
 * @returns array
 */
function mostPopularChars(string, allUpper) {
    string = _(string).map(function(char, i){
        if (!allUpper) {
            return char.charCodeAt(0);
        }
        return char.toUpperCase().charCodeAt(0);
    });
    return mostPopularNumbers(string, 0)
        .map(function(el, i){
            return [String.fromCharCode(el[0]), el[1]];
        });
}

// [0][0] would give 1st, [0][1] gives count
// [1][0] would give 2nd and so on, [1][1] gives 2nd count
function mostPopularNumbers(arr) {
    return _(arr)
        .countBy(function (num) {
            return num
        })
        // trick with key:val => [key:val]
        .pairs()
        // drop small ones
        .filter(function (num) {
            return num[1] > 2;
        })
        // order by occurrence
        .sortBy(function (val, key, arr) {
            return -val[1];
        })
//        .flatten()
        .value();
}

function mostPopularNumber(arr){
    return mostPopularNumbers(arr)[0][0];
}

module.exports.decode = decode;
module.exports.encode = encode;
module.exports.mostPopularNumbers = mostPopularNumbers;
module.exports.mostPopularNumber = mostPopularNumber;
module.exports.mostPopularChars = mostPopularChars;
