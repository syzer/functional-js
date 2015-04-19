/*
 Write a program which finds the next-to-last word in a string.
 Input sample:

 Your program should accept as its first argument a path to a filename. Input example is the following

 some line with text
 another line

 Each line has more than one word.
 Output sample:

 Print the next-to-last word in the following way.

 with
 another


 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'lastButOneWord');
var _ = require('lodash');

var input = [
    'some line with text',
    'another line'
].join('\n');

var output = [
    'with',
    'another'
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
