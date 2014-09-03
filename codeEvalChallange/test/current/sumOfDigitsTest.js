/**
 * Created by syzer on 8/27/2014.
 */
/**
 Sum of Digits

 Given a positive integer, find the sum of its constituent digits.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'sumOfDigits');
var _ = require('lodash');

var input = [
    '23',
    '496'
].join('\n');

var output = [
    '5',
    '19'
].join('\n');

describe('sum of digits', function () {

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
