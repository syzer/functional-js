/*
 Write a program which determines the sum of the first 1000 prime numbers.
 Input sample:

 There is no input for this program.
 Output sample:

 Print to stdout the sum of the first 1000 prime numbers.

 3682913


 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'findPrimes');
var _ = require('lodash');

var input = [
    '10',
    '20',
    '100'
].join('\n');

var output = [
    '2,3,5,7',
    '2,3,5,7,11,13,17,19',
    '2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97'
].join('\n');

describe('slangFlavour', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

    //it('can run on full sample', function (done) {
    //    var out = lib.run(inputFull);
    //    console.log('out:\n', out);
    //    //expect(out).eql(output);
    //    done();
    //});

});
