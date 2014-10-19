/**
 * Created by syzer on 8/27/2014.
 */
/*Multiply Lists
 Challenge Description:

 You have 2 lists of positive integers. Write a program which multiplies corresponding elements in these lists.
 Input sample:

 Your program should accept as its first argument a path to a filename. Input example is the following

 9 0 6 | 15 14 9
 5 | 8
 13 4 15 1 15 5 | 1 4 15 14 8 2

 The lists are separated with a pipe char, numbers are separated with a space char.
 The number of elements in lists are in range [1, 10].
 The number of elements is the same in both lists.
 Each element is a number in range [0, 99].
 Output sample:

 Print the result in the following way.

 135 0 54
 40
 13 16 225 14 120 10
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'multiplyLists');
var _ = require('lodash');

var input = [
    '9 0 6 | 15 14 9',
    '5 | 8',
    '13 4 15 1 15 5 | 1 4 15 14 8 2'
].join('\n');

var output = [
    '135 0 54',
    '40',
    '13 16 225 14 120 10'
].join('\n');

describe('suggest groups', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
//        console.log(out);
        expect(out).eql(output);
        done();
    });
});
