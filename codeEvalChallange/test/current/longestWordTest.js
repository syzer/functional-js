/**
 * Created by syzer on 8/27/2014.
 */
/*Longest Word
 Challenge Description:

 In this challenge you need to find the longest word in a sentence. If the sentence has more than one word of the same length you should pick the first one.
 Input sample:

 Your program should accept as its first argument a path to a filename. Input example is the following

 Each line has one or more words. Each word is separated by space char.
 Output sample:

 Print the longest word in the following way.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'longestWord');
var _ = require('lodash');

var input = [
    'some line with text',
    'another line'
].join('\n');

var output = [
    'some',
    'another'
].join('\n');

describe('suggest groups', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log(out);
//        expect(out).eql(output);
        done();
    });
});
