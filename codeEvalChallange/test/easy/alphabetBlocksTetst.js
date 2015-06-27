/**
 * https://www.codeeval.com/open_challenges/201
 *
 Alphabet blocks

 Challenge Description:

 We all remember those childhood times when we learned how to use alphabet blocks to form different words, such as MOM, DAD, TRAIN, and others. We propose you to remind this time for a while and imagine yourself being a child.
 So, you have a set of alphabet blocks. There is a letter on each of the six faces of every block. Also, you have a word associated with your childhood that you want to form.
 Write a program that will verify if it is possible to form the necessary word out of the set. If yes, then print "True" to stdout; otherwise, print "False".
 You can choose only one letter from an alphabet block and place blocks in any order.
 Input sample:

 The first argument is a path to a file. Each line contains test cases that have three arguments separated by the pipe symbol "|".
 1. The first argument in the line is a number that shows how many blocks are in the set.
 2. The second one is a word that you want to form.
 3. The third one is a list of arrays of letters. One face of the alphabet block includes one letter from array.
 For example:
 There is an array of letters "ABCDEF". It refers to one toy block with the following faces:
 "A", "B", "C", "D", "E", "F".

 *
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/';

var lib = require(SRC_DIR + 'alphabetBlocks');
var _ = require('lodash');

var input = [
    '4 | DOG | UPZRHR INOYLC KXDHNQ BAGMZI',
    '6 | HAPPY | PKMFQP KTXGCV OSDMAJ SDSIMY OEPGLE JZCDHI',
    '5 | PLAIN | BFUBZD XMQBNM IDXVCN JCOIAM OZYAYH'
].join('\n');

var output = [
    'True',
    'True',
    'False'
].join('\n');

describe('alphabetBlocks', function () {

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
