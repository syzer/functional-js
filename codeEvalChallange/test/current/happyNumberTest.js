/*
 A happy number is defined by the following process. Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers, while those that do not end in 1 are unhappy numbers.
 Input sample:

 The first argument is the pathname to a file which contains test data, one test case per line. Each line contains a positive integer. E.g.

 1
 7
 22

 Output sample:

 If the number is a happy number, print out 1. If not, print out 0. E.g

 1
 1
 0

 For the curious, here's why 7 is a happy number:
 7->49->97->130->10->1.
 Here's why 22 is NOT a happy number:
  22->8->64->52->29->85->89->145->42->20->4->16->37->58->89 ...
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'happyNumber');
var _ = require('lodash');

var input = [
    '1',
    '7',
    '22'
].join('\n');

var output = [
    '1',
    '1',
    '0'
].join('\n');

describe('happyNumber', function () {

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
