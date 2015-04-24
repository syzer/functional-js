/*
 A Decimal To Binary

 Challenge Description:

 You are given a decimal (base 10) number, print its binary representation.
 Input sample:

 Your program should accept as its first argument a path to a filename containing decimal numbers greater or equal to 0, one per line.

 Ignore all empty lines.

 For example:
 Output sample:

 Print the binary representation, one per line.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'toBinary');
var _ = require('lodash');

var input = [
    '2',
    '10',
    '67'
].join('\n');

var output = [
    '10',
    '1010',
    '1000011'
].join('\n');

describe('happyNumber', function () {

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
