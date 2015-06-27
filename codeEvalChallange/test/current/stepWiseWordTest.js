/**
 * https://www.codeeval.com/open_challenges/202/
 *
 * Sort matrix columns
 Challenge Description:

 Print the longest word in a stepwise manner.
 Input sample:

 The first argument is a path to a file. Each line contains a test case with a list of words that have different or the same length.

 For example:
 Output sample:

 Find the longest word in each line and print it in one line in a stepwise manner. Separate each new step with a space. If there are several words of the same length and they are the longest, then print the first word from the list.
 Constraints:

 The word length is from 1 to 10 characters.
 The number of words in a line is from 5 to 15.
 If there are several words of the same length and they are the longest, then print the first word from the list.
 The number of test cases is 40.

 cat dog hello
 stop football play
 music is my life

 h *e **l ***l ****o
 f *o **o ***t ****b *****a ******l *******l
 m *u **s ***i ****c

 *
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/';

var lib = require(SRC_DIR + 'sortMatrixColumn');
var _ = require('lodash');

var input = [
    'cat dog hello',
    'stop football play',
    'music is my life'
].join('\n');

var output = [
    'h *e **l ***l ****o',
    'f *o **o ***t ****b *****a ******l *******l',
    'm *u **s ***i ****c'
].join('\n');

describe('sortMatrixColumn', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

    //it('can run full', function (done) {
    //    var out = lib.run(inputFull);
    //    console.log('out:\n', out);
    //    expect(out).eql(outputFull);
    //    done();
    //});

});
