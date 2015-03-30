/**
 * sum 1000 primes
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'primes');
var _ = require('lodash');

var input = [
    ''
].join('\n');

var output = [
    '3682913'
].join('\n');


describe('remove repetitions', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on input', function (done) {
        var out = lib.run(input);
        console.log(out);
        expect(out).eql(output);
        done();
    });
});
