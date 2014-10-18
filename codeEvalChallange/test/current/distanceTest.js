/**
 * Created by syzer on 8/27/2014.
 */
/*Calculate Distance
 Challenge Description:

 You have coordinates of 2 points and need to find the distance between them.
 Input sample:

 Your program should accept as its first argument a path to a filename. Input example is the following

 All numbers in input are integers between -100 and 100.
 Output sample:

 Print results in the following way.

 You don't need to round the results you receive. They must be integer numbers.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'distance');
var _ = require('lodash');

var input = [
    '(25, 4) (1, -6)',
    '(47, 43) (-25, -11)'
].join('\n');

var output = [
    '26',
    '90'
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
