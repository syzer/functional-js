/**
 * Created by syzer on 8/4/2014.
 */
/**
 * Word Search
 Challenge Description:

 Given a 2D board and a word, find if the word exists in the grid.
 The word can be constructed from letters of sequentially adjacent cell,
 where adjacent cells are those horizontally or vertically neighboring.
 The same letter cell may not be used more than once.

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'wordSearchBoard');
var _ = require('lodash');

var input =
    'ASADB\n\
     ABCCED\n\
     ABCF\n';


var output =
    'False\n\
     True\n\
     False\n';


var input2 =
    'ABCE\n' +
    'SFCS\n' +
    'ADEZ\n';

var output2 =
    'True\n' +
    'True\n' +
    'False\n';


var input3 =
    'BS\n' +        // not close
    'ABCF\n' +      // not close
    'ADECZ\n' +     // no Z in array
    'CBASADFS\n' +  // same S twice
    'ABCES\n' +
    'SFCS\n' +
    'CCBAS\n' +
    'ADECS\n' +
    'CCESEEDASA\n';

var output3 =
    'False\n' +
    'False\n' +
    'False\n' +
    'False\n' +
    'True\n' +
    'True\n' +
    'True\n' +
    'True\n' +
    'True\n';

var input4 = 'CBASADFS\n';

var hardcodedBoard = [
    ['ABCE'],
    ['SFCS'],
    ['ADEE']
];

describe('wordSearchBoard', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('finds its', function (done) {
        expect(lib.run(input2)).eql(output2);
        expect(lib.run(input3)).eql(output3);
        done();
    });

    it('whereLetterInArray', function (done) {
        expect(lib.whereLetterInArray('A', hardcodedBoard)).eql([
            [0, 0],
            [0, 2]
        ]);
        expect(lib.whereLetterInArray('E', hardcodedBoard)).eql([
            [3, 0],
            [2, 2],
            [3, 2]
        ]);
        expect(lib.whereLetterInArraysReduce('A', hardcodedBoard)).eql([
            [0, 0],
            [0, 2]
        ]);
        expect(lib.whereLetterInArraysReduce('E', hardcodedBoard)).eql([
            [3, 0],
            [2, 2],
            [3, 2]
        ]);
        done();
    });
});
