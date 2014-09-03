/**
 * Created by syzer on 8/27/2014.
 */
/**
 The Major Element
 Challenge Description:

 The major element in a sequence with the length of L is the element which appears
 in a sequence more than L/2 times. The challenge is to find that element in a sequence.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'majorElement');
var _ = require('lodash');

var input = [
    '92,19,19,76,19,21,19,85,19,19,19,94,19,19,22,67,83,19,19,54,59,1,19,19',
    '92,11,30,92,1,11,92,38,92,92,43,92,92,51,92,36,97,92,92,92,43,22,84,92,92',
    '4,79,89,98,48,42,39,79,55,70,21,39,98,16,96,2,10,24,14,47,0,50,95,20,95,48,50,12,42'
].join('\n');

var output = [
    '19',
    '92',
    'None',
].join('\n');

describe('majorElement', function () {

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
