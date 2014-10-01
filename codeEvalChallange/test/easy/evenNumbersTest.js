/**
 * Created by syzer on 8/27/2014.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'evenNumbers');
var _ = require('lodash');

var input = [
    '701',
    '4123',
    '2936'
].join('\n');

var output = [
    '0',
    '0',
    '1'
].join('\n');

describe('even numbers', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        expect(out).eql(output);
        done();
    });


});
