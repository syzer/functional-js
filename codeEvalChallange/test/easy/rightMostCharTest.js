/**
 * Created by syzer on 8/27/2014.
 */
/**
 Rightmost Char
 Challenge Description:

 You are given a string 'S' and a character 't'. Print out the position of the rightmost occurrence of 't' (case matters) in 'S' or -1 if there is none. The position to be printed out is zero based.
 Input sample:

 The first argument will ba a path to a filename, containing a string and a character, comma delimited, one per line. Ignore all empty lines in the input file. E.g.

 Hello World,r
 Hello CodeEval,E

 Output sample:

 Print out the zero based position of the character 't' in string 'S', one per line. Do NOT print out empty lines between your output.
 E.g.

 8
 10
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'rightMostChar');
var _ = require('lodash');

var input = [
    'Hello World,r',
    'Hello CodeEval,E'
].join('\n');

var output = [
    '8',
    '10'
].join('\n');


describe('right most char', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on small sample', function (done) {
        var out = lib.run(input);
//        console.log('\nTOTAL:\n', out);
        expect(out).eql(output);
        done();
    });

});
