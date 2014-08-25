/**
 * Created by syzer on 8/25/2014.
 */
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
var SRC_DIR = './../../src/lib/'; // run on over the test

var _ = require('lodash');
var lib = require(SRC_DIR + 'lib')(_);

var hardcodedBoard = [
    ['ABCE'],
    ['SFCS'],
    ['ADEE']
];

describe('wordSearchBoard', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });


    it('finds also neighbours', function (done) {
        expect(lib.findAttached([1, 2], hardcodedBoard)).eql([
            [],
            [ 'F' ],
            [ 'A', 'E' ]
        ]);
        expect(lib.findAttached([0, 1], hardcodedBoard)).eql([
            [ 'A' ],
            [ 'F' ],
            [ 'A' ]
        ]);
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

    //TODO move to lib
    it('rejects arrays', function (done) {
        var rejectedArray = [
            [3, 0],
            [2, 2],
            [3, 2]
        ];
        var array = [
            [2, 0],
            [3, 0],
            [2, 2],
            [3, 2],
            [0, 0],
            [1, 0]
        ];
        expect(lib.rejectArrays(array, rejectedArray)).eql([
            [ 2, 0 ],
            [ 0, 0 ],
            [ 1, 0 ]
        ]);
        expect(lib.rejectArrays(array, [])).eql(array);


        done();
    });


    it('is Letter in board works', function (done) {
        expect(lib.isLetterInArrays(['A'], hardcodedBoard)).eql(true);
        expect(lib.isLetterInArrays(['B'], hardcodedBoard)).eql(true);
        expect(lib.isLetterInArrays(['Z'], hardcodedBoard)).eql(false);
        expect(lib.isLetterInArrays(['F'], hardcodedBoard)).eql(true);
        expect(lib.isLetterInArrays(['D'], hardcodedBoard)).eql(true);
        done();
    });

});
