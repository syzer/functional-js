/*
 An Armstrong number is an n-digit number that is equal
 to the sum of the n'th powers of its digits.
 Determine if the input numbers are Armstrong numbers.
 Input sample:

 Your program should accept as its first argument a path
 to a filename. Each line in this file has a positive integer. E.g.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'armstrongNumber');
var _ = require('lodash');

var input = [
    '6',
    '153',
    '351'
].join('\n');

var output = [
    'True',
    'True',
    'False'
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
