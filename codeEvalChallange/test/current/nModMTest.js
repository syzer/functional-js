/**
 * Created by syzer on 8/27/2014.
 */
/**
 N Mod M
 Challenge Description:

 Given two integers N and M, calculate N Mod M (without using any inbuilt modulus operator).
 Input sample:

 Your program should accept as its first argument a path to a filename.
 Each line in this file contains two comma separated positive integers. E.g.

 20,6
 2,3

 You may assume M will never be zero.

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'nModM');
var _ = require('lodash');

var input = [
    '20,6',
    '2,3',
    '50,5',
    '3,2'
].join('\n');

var output = [
    '2',
    '2',
    '0',
    '1'
].join('\n');


var inputSmall = [
    '38,57'
].join('\n');

var outputSmall = [
    '38'
].join('\n');

describe('nModM test', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on smallest sample', function (done) {
        var out = lib.run(inputSmall);
        console.log('\nTOTAL:\n', out);
        expect(out).eql(outputSmall);
        done();
    });

    it('can run on small sample', function (done) {
        var out = lib.run(input);
        console.log('\nTOTAL:\n', out);
        expect(out).eql(output);
        done();
    });

    it('can run on large sample', function (done) {
        var inputLong = [
            '38,57',
            '44,33',
            '15,85',
            '93,42',
            '64,96',
            '11,28',
            '66,63',
            '21,9',
            '84,61',
            '7,41',
            '99,21',
            '22,84',
            '7,85',
            '53,55',
            '91,52',
            '8,6',
            '6,4',
            '45,7',
            '75,18',
            '34,46',
            '28,83',
            '64,11',
            '50,28',
            '38,84',
            '28,42',
            '57,38',
            '59,90',
            '6,82',
            '84,37',
            '27,43',
            '39,7',
            '36,60',
            '36,87',
            '8,94',
            '17,92',
            '59,12',
            '97,19',
            '33,46',
            '25,67',
            '25,1'
        ].join('\n');

        var outputLong = [
                38%57,
                44%33,
                15%85,
                93%42,
                64%96,
                11%28,
                66%63,
                21%9,
                84%61,
                7%41,
                99%21,
                22%84,
                7%85,
                53%55,
                91%52,
                8%6,
                6%4,
                45%7,
                75%18,
                34%46,
                28%83,
                64%11,
                50%28,
                38%84,
                28%42,
                57%38,
                59%90,
                6%82,
                84%37,
                27%43,
                39%7,
                36%60,
                36%87,
                8%94,
                17%92,
                59%12,
                97%19,
                33%46,
                25%67,
                25%1].join('\n');
        var out = lib.run(inputLong);
        expect(out).eql(outputLong);
        done();
    });


});
