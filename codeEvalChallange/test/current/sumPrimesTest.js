/*
 Write a program which determines the sum of the first 1000 prime numbers.
 Input sample:

 There is no input for this program.
 Output sample:

 Print to stdout the sum of the first 1000 prime numbers.

 3682913


 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'sumPrimes');
var _ = require('lodash');

var input = [
   ''
].join('\n');

var output = [
    '3682913'
].join('\n');


describe('slangFlavour', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.runAll(input);
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
