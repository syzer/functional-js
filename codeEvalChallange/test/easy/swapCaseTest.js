/**
 * Created by syzer on 8/27/2014.
 */
/**
 Swap Case
 Challenge Description:

 Write a program which swaps letters' case in a sentence. All non-letter characters should remain the same.
 Input sample:

 Your program should accept as its first argument a path to a filename. Input example is the following

 Hello world!
 JavaScript language 1.8
 A letter

 Output sample:

 Print results in the following way.

 hELLO WORLD!
 jAVAsCRIPT LANGUAGE 1.8
 a LETTER
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'swapCase');
var _ = require('lodash');

var input = [
    'Hello world!',
    'JavaScript language 1.8',
    'A letter'
].join('\n');

var output = [
    'hELLO WORLD!',
    'jAVAsCRIPT LANGUAGE 1.8',
    'a LETTER'
].join('\n');

//
//var inputSmall = [
//    'zero;two;five;seven;eight;four'
//].join('\n');
//
//var outputSmall = [
//    '025784'
//].join('\n');

describe('fibonacci', function () {

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
