/**
 * Created by syzer on 8/27/2014.
 */
/**
 * Without Repetitions
 Challenge Description:

 In a given text, if there are two or more identical characters in sequence, delete the repetitions and leave only the first character.

 For example:

 Shellless mollusk lives in wallless house in wellness. Aaaarrghh!

 ?

 Sheles molusk lives in wales house in welnes. Aargh!

 Input sample:

 The first argument is a file. The file contains a text.

 For example:
 Output sample:

 Print to stdout the text in which all repetitions are deleted.

 For example:
 Constraints:
 The text is case-sensitive: ‘a’ and ‘A’ are different characters.
 The input consists of 40 text lines.
 The maximum size of the text is 10 KB.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'removeRepetitions');
var _ = require('lodash');

var input = [
    'Shellless mollusk lives in wallless house in wellness. Aaaarrghh!',
    'But as he spake he drew the good sword from its scabbard, and smote a heathen knight, Jusssstin of thee Iron Valley.',
    'No matttter whom you choose, she deccccclared, I will abide by your decision.',
    'Wwwhat is your will?',
    'At his magic speech the ground oppened and he began the path of descent.',
    'I should fly away and you would never see me again.'
].join('\n');
var output = [
    'Sheles molusk lives in wales house in welnes. Aargh!',
    'But as he spake he drew the god sword from its scabard, and smote a heathen knight, Justin of the Iron Valey.',
    'No mater whom you chose, she declared, I wil abide by your decision.',
    'Wwhat is your wil?',
    'At his magic spech the ground opened and he began the path of descent.',
    'I should fly away and you would never se me again.'
].join('\n');


describe('remove repetitions', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on input', function (done) {
        var out = lib.run(input);
        console.log(out);
        expect(out).eql(output);
        done();
    });
});
