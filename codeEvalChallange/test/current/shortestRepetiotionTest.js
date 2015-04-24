/*
 Write a program to determine the shortest repetition in a string.
 A string is said to have period p if it can be formed by concatenating one or more repetitions of another string of length p. For example, the string "xyzxyzxyzxyz" has period 3, since it is formed by 4 repetitions of the string "xyz". It also has periods 6 (two repetitions of "xyzxyz") and 12 (one repetition of "xyzxyzxyzxyz").
 Input sample:

 Your program should accept as its first argument a path to a filename. Each line will contain a string of up to 80 non-blank characters. E.g.

 abcabcabcabc
 bcbcbcbcbcbcbcbcbcbcbcbcbcbc
 dddddddddddddddddddd
 adcdefg

 Output sample:

 Print out the smallest period of the input string. E.g.

 3
 2
 1
 7
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'shortestRepetition');
var _ = require('lodash');

var input = [
    'abcabcabcabc',
    'bcbcbcbcbcbcbcbcbcbcbcbcbcbc',
    'dddddddddddddddddddd',
    'adcdefg'
].join('\n');

var output = [
    '3',
    '2',
    '1',
    '7'
].join('\n');

var realSample = [
    'tuvwxyz',
    'mnopqrsmnopqrsmnopqrsmnopqrsmnopqrsmnopqrsmnopqrsmnopqrsmnopqrs',
    'vwxyvwxyvwxyvwxyvwxyvwxyvwxyvwxy',
    'b',
    'defghijklmnopqrs',
    'defghijklmnodefghijklmnodefghijklmnodefghijklmnodefghijklmno',
    'abcdefabcdefabcdefabcdefabcdefabcdefabcdef',
    'opqrs',
    'ijij',
    'abcdefghijklmnopqrstuvwxyz',
    'cdefghijklmnopqrstuvwx',
    'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'fghijklmnofghijklmnofghijklmnofghijklmno',
    'ghijklmnopqrstuvwxghijklmnopqrstuvwxghijklmnopqrstuvwxghijklmnopqrstuvwx',
    'qrstuqrstuqrstuqrstuqrstuqrstuqrstuqrstuqrstuqrstu',
    'ghijklmnghijklmnghijklmnghijklmnghijklmn',
    'lmnopqrstuvwxylmnopqrstuvwxy',
    'abcabcabcabcabcabcabcabcabc',
    'jjjjj',
    'ghijklmnopqrsghijklmnopqrsghijklmnopqrs'
].join('\n');

describe('shortestRepetition', function () {

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
