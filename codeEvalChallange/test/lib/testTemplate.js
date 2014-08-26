/**
 * Created by syzer on 8/26/2014.
 */
/**
 *  The Da Vyncy Code
        DESCRIPTION

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'name');
var _ = require('lodash');

var input = '';
var output = '';


describe('name test', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        expect(lib.run(input)).eql(output);
        done();
    });

});
