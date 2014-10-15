/**
 * Created by syzer on 8/27/2014.
 */
/*You are given two sorted list of numbers (ascending order).
The lists themselves are comma delimited and the two lists are semicolon
delimited. Print out the intersection of these two sets.
    Input sample:

    File containing two lists of ascending order sorted integers,
    comma delimited, one per line. E.g.

1,2,3,4;4,5,6
20,21,22;45,46,47
7,8,9;8,9,10,11,12

Output sample:

    Print out the ascending order sorted intersection of the two lists,
    one per line. Print empty new line in case the lists have
    no intersection. E.g.
4

8,9
*/

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'setIntersection');
var _ = require('lodash');

var input = [
    '1,2,3,4;4,5,6',
    '20,21,22;45,46,47',
    '7,8,9;9,8,10,11,12'
].join('\n');

var output = [
    '4',
    '',
    '8,9'
].join('\n');

describe('intersection on sets', function () {

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
