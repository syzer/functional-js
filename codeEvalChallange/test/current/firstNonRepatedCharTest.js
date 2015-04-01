/**
 * Created by syzer on 3/22/2015.
 */
/*
 https://www.codeeval.com/open_challenges/12/
 Write a program which finds the first non-repeated character in a string.
 Input sample:

 The first argument is a path to a file. The file contains strings.

 For example:
 yellow
 tooth

 Output sample:
 y
 h

 Print to stdout the first non-repeated character, one per line.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'firstNonRepeatedChar');
var _ = require('lodash');

var input = [
    'yellow',
    'tooth'
].join('\n');

var output = [
    'y',
    'h'
].join('\n');

describe('firstNonRepeatedChar', function () {

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
