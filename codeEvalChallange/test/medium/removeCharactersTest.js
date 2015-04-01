/**
 * Created by syzer on 3/22/2015.
 */
/*
 https://www.codeeval.com/open_challenges/13/
 Write a program which removes specific characters from a string.
 Input sample:

 The first argument is a path to a file. The file contains the source strings
 and the characters that need to be scrubbed. Each source string and characters
 you need to scrub are delimited by comma.

 For example:
 Output sample:

 Print to stdout the scrubbed strings, one per
 line. Ensure that there are no trailing empty spaces on each line you print.

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'removeCharacters');
var _ = require('lodash');

var input = [
    'how are you, abc',
    'hello world, def'
].join('\n');

var output = [
    'how re you',
    'hllo worl'
].join('\n');

describe('removeCharacters', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

    //it('can run on full sample', function (done) {
    //    var out = lib.run(inputFull);
    //    console.log('out:\n', out);
    //    //expect(out).eql(output);
    //    done();
    //});

});
