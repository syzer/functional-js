/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'emailValidation');

var input =
    'foo@bar.com\n'+
    'this is not an email id\n'+
    'admin#codeeval.com\n'+
    'good123@bad.com\n';

var output =
    'true\n'+
    'false\n'+
    'false\n'+
    'true\n';


describe('email validator', function () {
    afterEach(function (done) {
        setTimeout(done, 600);
    });

    it('can get every other number in stack', function (done) {
//        console.log(lib.run(input));
        expect(lib.run(input)).eql(output);
        done();
    });
});
