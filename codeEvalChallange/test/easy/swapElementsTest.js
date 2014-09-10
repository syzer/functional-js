/**
 * Created by syzer on 8/27/2014.
 */
/**
 Swap Elements
 Challenge Description:

 You are given a list of numbers which is supplemented with positions that have to be swapped.
 Input sample:

 Your program should accept as its first argument a path to a filename. Input example is the following

 1 2 3 4 5 6 7 8 9 : 0-8
 1 2 3 4 5 6 7 8 9 10 : 0-1, 1-3

 As you can see a colon separates numbers with positions.
 Positions start with 0.
 You have to process positions left to right. In the example above (2nd line)
 first you process 0-1, then 1-3.

 Output sample:

 Print the lists in the following way.

 9 2 3 4 5 6 7 8 1
 2 4 3 1 5 6 7 8 9 10
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'swapElements');
var _ = require('lodash');

var input = [
    ' 1 2 3 4 5 6 7 8 9 : 0-8',
    '1 2 3 4 5 6 7 8 9 10 : 0-1, 1-3'
].join('\n');

var output = [
    '9 2 3 4 5 6 7 8 1',
    '2 4 3 1 5 6 7 8 9 10'
].join('\n');


describe('right most char', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on small sample', function (done) {
        var out = lib.run(input);
        console.log('\nTOTAL:\n', out);
        expect(out).eql(output);
        done();
    });

});
