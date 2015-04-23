/*
 Hidden Digits

 Challenge Description:

 In this challenge you're given a random string containing
 hidden and visible digits. The digits are hidden behind
 lower case latin letters as follows: 0 is behind 'a', 1
 is behind ' b ' etc., 9 is behind 'j'. Any other symbol
 in the string means nothing and has to be ignored.
  So the challenge is to find all visible and hidden
  digits in the string and print them out in order of
  their appearance.
 Input sample:

 Your program should accept as its first argument a path to a filename. Each line in this file contains a string. You may assume that there will be no white spaces inside the string. E.g.

 abcdefghik
 Xa,}A#5N}{xOBwYBHIlH,#W
 (ABW>'yy^'M{X-K}q,
 6240488

 Output sample:

 For each test case print out all visible and hidden digits in order of their appearance. Print out NONE in case there is no digits in the string. E.g.

 012345678
 05
 NONE
 6240488
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'hiddenNumber');
var _ = require('lodash');

var input = [
    'abcdefghik',
    'Xa,}A#5N}{xOBwYBHIlH,#W',
    "(ABW>'yy^'M{X-K}q,",
    '6240488'
].join('\n');

var output = [
    '012345678',
    '05',
    'NONE',
    '6240488'
].join('\n');

describe('armstrongNumber', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });
});
