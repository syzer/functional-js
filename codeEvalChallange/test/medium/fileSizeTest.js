/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'fileSize');
var _ = require('lodash');

var input = __dirname + '/discountOffersTest.js';

var output = 55;

describe('pascal Case', function () {
    afterEach(function (done) {
        setTimeout(done, 600);
    });

    it('can get every other number in stack', function (done) {
        console.log(lib.run(input));
        expect(_.isNumber(lib.run(input))).eql(true);
        done();
    });
});
