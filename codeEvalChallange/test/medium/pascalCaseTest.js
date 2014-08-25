/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'pascalCase');

var input =
    'Hello world\n' +
    'javaScript language\n' +
    'a letter\n' +
    '1st thing\n';

var output =
    'Hello World\n' +
    'JavaScript Language\n' +
    'A Letter\n' +
    '1st Thing\n';


describe('pascal Case', function () {
    afterEach(function (done) {
        setTimeout(done, 600);
    });

    it('can get every other number in stack', function (done) {
        console.log(lib.run(input));
        expect(lib.run(input)).eql(output);
        done();
    });
});
