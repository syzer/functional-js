/**
 * Created by syzer on 8/27/2014.
 */
/**
 Reverse words
 Challenge Description:

 Write a program to reverse the words of an input sentence.
 Input sample:

 The first argument will be a path to a filename containing multiple sentences, one per line. Possibly empty lines too. E.g.

 Hello World
 Hello CodeEval

 Output sample:

 Print to stdout, each line with its words reversed, one per line. Empty lines in the input should be ignored. Ensure that there are no trailing empty spaces on each line you print. E.g.

 World Hello
 CodeEval Hello
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'reverseWords');
var _ = require('lodash');

var input = [
    'Hello World',
    'Hello CodeEval'
].join('\n');

var output = [
    'World Hello',
    'CodeEval Hello'
].join('\n');

//
//var inputSmall = [
//    'zero;two;five;seven;eight;four'
//].join('\n');
//
//var outputSmall = [
//    '025784'
//].join('\n');

describe('reverse words', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

//    it('can run on smallest sample', function (done) {
//        var out = lib.run(inputSmall);
////        console.log('\nTOTAL:\n', out);
//        expect(out).eql(outputSmall);
//        done();
//    });

    it('can run on small sample', function (done) {
        var out = lib.run(input);
//        console.log('\nTOTAL:\n', out);
        expect(out).eql(output);
        done();
    });

});
