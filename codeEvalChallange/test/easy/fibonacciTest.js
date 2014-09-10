/**
 * Created by syzer on 8/27/2014.
 */
/**
 Fibonacci Series
 Challenge Description:

 The Fibonacci series is defined as: F(0) = 0; F(1) = 1; F(n) = F(n-1) + F(n-2) when n>1. Given a positive integer 'n', print out the F(n).
 Input sample:

 The first argument will be a path to a filename containing a positive integer, one per line. E.g.

 5
 12

 Output sample:

 Print to stdout, the fibonacci number, F(n). E.g.

 5
 144
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'fibonacci');
var _ = require('lodash');

var input = [
    '5',
    '12'
].join('\n');

var output = [
    '5',
    '144'
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
