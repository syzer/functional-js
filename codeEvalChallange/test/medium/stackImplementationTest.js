/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'stackImplementation');

var input =
    '1 2 3 4\n' +
    '1 2 3 4 -1\n' +
    '10 -2 3 4\n';

var output =
    '4 2\n' +
    '-1 3 1\n' +
    '4 -2\n';


describe('stack implementation is cheated', function () {
    afterEach(function (done) {
        setTimeout(done, 600);
    });

    it('can get every other number in stack', function (done) {
//        console.log(lib.run(input));
        expect(lib.run(input)).eql(output);
        done();
    });
});
