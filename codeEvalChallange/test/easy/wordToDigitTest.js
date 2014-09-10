/**
 * Created by syzer on 8/27/2014.
 */
/**
 Word to Digit
 Challenge Description:

 Having a string representation of a set of numbers you need to print this numbers.

 All numbers are separated by semicolon. There are up to 20 numbers in one line.
 The numbers are "zero" to "nine"
 Input sample:

 Your program should accept as its first argument a path to a filename.
 Each line in this file is one test case. E.g.

 zero;two;five;seven;eight;four
 three;seven;eight;nine;two

 Output sample:

 Print numbers in the following way:

 025784
 37892
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'wordToDigit');
var _ = require('lodash');

var input = [
    'zero;two;five;seven;eight;four',
    'three;seven;eight;nine;two'
].join('\n');

var output = [
    '025784',
    '37892'
].join('\n');


var inputSmall = [
    'zero;two;five;seven;eight;four'
].join('\n');

var outputSmall = [
    '025784'
].join('\n');

describe('word to digit', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on smallest sample', function (done) {
        var out = lib.run(inputSmall);
//        console.log('\nTOTAL:\n', out);
        expect(out).eql(outputSmall);
        done();
    });

    it('can run on small sample', function (done) {
        var out = lib.run(input);
//        console.log('\nTOTAL:\n', out);
        expect(out).eql(output);
        done();
    });

});
