/**
 * Created by syzer on 8/27/2014.
 */
/*Minesweeper
 Challenge Description:

 You will be given an M*N matrix. Each item in this matrix is either a '*' or a '.'.
 A '*' indicates a mine whereas a '.' does not. The objective of the challenge is to
 output a M*N matrix where each element contains a number
 (except the positions which actually contain a mine which will remain as '*')
 which indicates the number of mines adjacent to it.
 Notice that each position has at most 8 adjacent positions e.g. left, top left, top, top right, right, ...

 Input sample:

 Your program should accept as its first argument a path to a filename.
 Each line in this file contains M,N, a semicolon and the M*N matrix in row major form. E.g.

 3,5;**.........*...
 4,4;*........*......

 Output sample:

 Print out the new M*N matrix (in row major form) with each position(except the ones with the mines) indicating how many adjacent mines are there. E.g.

 **100332001*100
 *10022101*101110
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'mineSweeper');
var _ = require('lodash');

var output = [
    '**100332001*100',
    '*10022101*101110',
    '************',
    '1*2*2*' +
    '333232' +
    '**33*1' +
    '23**21',

    '112*20' +
    '*12*20'
].join('\n');


var inputSmall = [
    '3,5;**.........*...',
    '4,4;*........*......',
    '2,6;************',
    '4,6;.*.*.*' +
        '......' +
        '**..*.' +
        '..**..',

    '2,6;...*..' +
        '*..*..'
].join('\n');

var inputReal = [
    "2,6;************",
    "9,2;*............*...*",
    "2,2;****",
    "6,9;........*...**.........*.....*..*.....................",
    "4,5;....**...*.*.*...*..",
    "2,2;....",
    "2,6;...*..*..*..",
    "3,4;.*......*...",
    "8,3;........................",
    "6,5;.........*.*........*...*.....",
    "6,5;.*....*...........*..*........",
    "4,6;.*.*.*......**..*...**..",
    "9,9;......*.......*.*.....*.*..........*....*....*.......****...*.*.**..*...*.....*..",
    "6,9;******************************************************",
    "8,2;.*.....*....*...",
    "7,8;...*.***...............................*......*.......*.",
    "9,9;......*..*...........**........*..............*..**..*..*.*.*.*.......****.*.....",
    "5,9;**........*..*...*...**.*.............*...*..",
    "6,4;.....*....*........*....",
    "2,2;.**.",
    "6,8;...*....*.**..........*..*.*......*......*..*...",
    "5,8;........................................",
    "7,3;..................*..",
    "4,2;....*...",
    "5,7;......*.*..**.**.....*.........*.**",
    "6,9;...*......*..*...........*...*.......*..***.*.........",
    "5,3;**.......*.....",
    "5,7;...*............................*..",
    "7,9;*....*.**......*.....**.*...**......*...*.........**..*..*....*",
    "7,2;..............",
    "5,3;***************",
    "2,9;....*.....**..*..*",
    "6,3;******************",
    "4,6;........................",
    "7,8;.*..*.......................*..*.*.....*.*...........*..",
    "3,3;......**.",
    "2,6;............",
    "8,2;.*.*..*.........",
    "2,4;....*.*.",
    "7,7;................................................."
].join('\n');



describe('mineSweeper', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    //it('can run on smaple 1', function (done) {
    //    var out = lib.run(input1);
    //    console.log(out);
    //    expect(out).eql(output1);
    //    done();
    //});

    it('can run', function (done) {
        var out = lib.run(inputSmall);
        console.log(out);
        expect(out).eql(output);
        done();
    });
});
