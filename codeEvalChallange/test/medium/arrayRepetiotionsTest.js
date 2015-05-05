/*
 Array Absurdity

 Challenge Description:

 Imagine we have an immutable array of size N which we know to be filled with
 integers ranging from 0 to N-2, inclusive. Suppose we know that the array
 contains exactly one duplicated entry and that duplicate appears exactly twice.
 Find the duplicated entry. (For bonus points, ensure your solution has constant
 space and time proportional to N)
 Input sample:

 Your program should accept as its first argument a path to a filename.
 Each line in this file is one test case. Ignore all empty lines.
 Each line begins with a positive integer(N) i.e. the size of the array,
 then a semicolon followed by a comma separated list of positive numbers ranging
 from 0 to N-2, inclusive. i.e eg.

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'arrayRepetitions');
var _ = require('lodash');

var input = [
    '5;0,1,2,3,0',
    '20;0,1,10,3,2,4,5,7,6,8,11,9,15,12,13,4,16,18,17,14'
].join('\n');

var output = [
    '0',
    '4'
].join('\n');


describe('calcDirection', function () {

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
