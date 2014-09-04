/**
 * Created by syzer on 8/27/2014.
 */
/**
 BIT POSITIONS

 Given a number n and two integers p1,p2 determine if the bits in position p1 and p2 are the same or not. Positions p1 and p2 are 1 based.
 Input sample:

 The first argument will be a path to a filename containing a comma separated list of 3 integers, one list per line. E.g.
 Output sample:

 Print to stdout, 'true'(lowercase) if the bits are the same,
 else 'false'(lowercase). E.g.

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'bitPositions');
var _ = require('lodash');

var input = [
    '86,2,3',
    '125,1,2'
].join('\n');

var output = [
    'true',
    'false'
].join('\n');

describe('bitPositions', function () {

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
