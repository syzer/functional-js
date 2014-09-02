/**
 * Created by syzer on 8/27/2014.
 */
/**
 * Number of Ones

 Write a program to determine the number of 1 bits
 in the internal representation of a given integer.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'numberOfOnes');
var _ = require('lodash');

var input = [
    '10',
    '22',
    '56'
].join('\n');

var output = [
    '2',
    '3',
    '3'
].join('\n');

describe('number of ones', function () {

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
