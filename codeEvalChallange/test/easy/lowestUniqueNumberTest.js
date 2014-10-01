/**
 * Created by syzer on 8/27/2014.
 */
// index of lowest unique number

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'lowestUniqueNumber');
var _ = require('lodash');

var input = [
    '3 3 9 1 6 5 8 1 5 3',
    '9 2 9 9 1 8 8 8 2 1 1'
].join('\n');

var output = [
    '5',
    '0'
].join('\n');

describe('lowest unique number', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on small sample', function (done) {
        var smallInput = [
            '3 3 9 1 6 5 8 1 5 3'
        ].join('\n');
        var out = lib.run(smallInput);
//        console.log(out);
        var expected = [
           '5'
        ].join('\n');
        expect(out).eql(expected);
        done();
    });

    it('can run ', function (done) {

        var out = lib.run(input);
        expect(out).eql(output);
        done();
    });


});
