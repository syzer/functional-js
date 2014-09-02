/**
 * Created by syzer on 8/27/2014.
 */
/**
 String Searching

 You are given two strings. Determine if the second string is a substring
 of the first (Do NOT use any substr type library function).
 The second string may contain an asterisk(*) which should be treated as a
 regular expression i.e. matches zero or more characters.
 The asterisk can be escaped by a \ char in which case it should be interpreted
 as a regular '*' character.
 To summarize: the strings can contain alphabets, numbers, * and \ characters.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'stringSearch');
var _ = require('lodash');

var input = [
    'Hello,ell',
    'This is good, is',
    'CodeEval,C*Eval',
    'Old,Young'
].join('\n');

var output = [
    true,
    true,
    true,
    false
].join('\n');

describe('number of ones', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
//        expect(out).eql(output);
        done();
    });

});
