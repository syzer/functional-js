/**
 * Created by syzer on 8/27/2014.
 */
/**
 Lettercase Percentage Ratio

 Your goal is to find the percentage ratio of lowercase and uppercase letters in line below.


 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'letercasePrecentageRatio');
var _ = require('lodash');

var input = [
    'thisTHIS',
    'AAbbCCDDEE',
    'N',
    'UkJ'
].join('\n');

var output = [
    'lowercase: 50.00 uppercase: 50.00',
    'lowercase: 20.00 uppercase: 80.00',
    'lowercase: 0.00 uppercase: 100.00',
    'lowercase: 33.33 uppercase: 66.67'
].join('\n');

describe('letercasePrecentageRatio', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    // count lower
    it('countLowerUpperCase', function (done) {
        var string1 = 'thisTHIS';
        var string2 = 'N';
        var empty = '';
        expect(lib.countLowerUpperCase(string1)).eql([4, 4]);
        expect(lib.countLowerUpperCase(string2)).eql([0, 1]);
        expect(lib.countLowerUpperCase(string2)).eql([0, 1]);

        done();
    });

    it('isUpperCase on N gives true', function (done) {
        var char = 'n';
        var char2 = 'N';
        var empty = '';
        expect(lib.isUpperCase(char)).eql(false);
        expect(lib.isUpperCase(char2)).eql(true);
        expect(lib.isUpperCase(char2)).eql(true);

        done();
    });

    it('can run', function (done) {
        var out = lib.run(input);
//        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

});
