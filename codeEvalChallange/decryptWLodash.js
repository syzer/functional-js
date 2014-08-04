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

var input = '5 | s | 92 112 109 40 118 109 109 108 123 40 119 110 40 124 112 109 40 117 105 118 129 40 119 125 124 127 109 113 111 112 40 124 112 109 40 118 109 109 108 123 40 119 110 40 124 112 109 40 110 109 127 54 40 53 40 91 120 119 107 115';
var output = 'The needs of the many outweigh the needs of the few. - Spock';
var input2 = 'The function called per element or the number of elements to return. If a property name or object';
input2 = encode(input2);

//1. array to ram
//2. determine space
//3. determine shift
//4. map/reduce shifted answer
function decode(input) {
    var SPACE = 32;
    input = input.substring(8).split(' ');
    var space = _(input).chain()
        .countBy(function (num) {
            return num
        })
        // trick with key:val => [key:val]
        .pairs()
        // drop small ones
        .filter(function (num) {
            return num[1] > 2;
        })
        // order by occurance
        .sortBy(function (val, key, arr) {
            return -val[1];
        })
        .flatten()
        .value()[0];    // [1] would give 2nd and so on
    var shift = space - SPACE;

    return input.map(function (char) {
        return String.fromCharCode(char - shift);
    }).join('');
}
console.log(decode(input));


