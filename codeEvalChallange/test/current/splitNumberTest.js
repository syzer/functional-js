/*
 https://www.codeeval.com/open_challenges/131/

 Split The Number

 Challenge Description:

 You are given a number N and a pattern. The pattern consists of lowercase latin letters
 and one operation "+" or "-". The challenge is to split the number and evaluate it
 according to this pattern e.g.
 1232 ab+cd -> a:1, b:2, c:3, d:2 -> 12+32 -> 44

 Input sample:

 Your program should accept as its first argument a path to a filename. Each line of the
 file is a test case, containing the number and the pattern separated by a single
 whitespace. E.g.

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'splitNumber');
var _ = require('lodash');

var input = [
    '3413289830 a-bcdefghij',
    '776 a+bc',
    '12345 a+bcde',
    '1232 ab+cd',
    '90602 a+bcde'
].join('\n');

var output = [
    '-413289827',
    '83',
    '2346',
    '44',
    '611'
].join('\n');

describe('splitNumber', function () {

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
