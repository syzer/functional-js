/**
 * Created by syzer on 8/27/2014.
 */
/**
 Text Dollar

 You are given a positive integer number.
 This represents the sales made that day in your department store.
 The payables department however, needs this printed out in english.
 NOTE: The correct spelling of 40 is Forty. (NOT Fourty)

 For each set of input produce a single line of output which is
 the english textual representation of that integer.
 The output should be unspaced and in Camelcase.
 Always assume plural quantities. You can also assume that the
 numbers are < 1000000000 (1 billion). In case of ambiguities e.g. 2200
 could be TwoThousandTwoHundredDollars or TwentyTwoHundredDollars,
 always choose the representation with the larger base i.e.
 TwoThousandTwoHundredDollars. For the examples shown above,
 the answer would be:

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'textDollars');
var _ = require('lodash');

var input = [
    '3',
    '10',
    '21',
    '466',
    '1234',
    '101',
    '1010',
    '201000',
    '854750',
    '278854750',
    '100000000',
    '2200'
].join('\n');

var output = [
    'ThreeDollars',
    'TenDollars',
    'TwentyOneDollars',
    'FourHundredSixtySixDollars',
    'OneThousandTwoHundredThirtyFourDollars',
    'OneHundredOneDollars',
    'OneThousandTenDollars',
    'TwoHundredOneThousandDollars',
    'EightHundredFiftyFourThousandSevenHundredFiftyDollars',
    'TwoHundredSeventyEightMillionEightHundredFiftyFourThousandSevenHundredFiftyDollars',
    'OneHundredMillionDollars',
    'TwoThousandTwoHundredDollars'
].join('\n');

var fullInput = [
    8170,
    66548,
    638641816,
    518913195,
    83,
    786,
    500,
    626,
    749,
    123456789,
    53605,
    25882,
    182462745,
    2521,
    3520,
    602,
    363830605,
    147,
    956848525,
    669,
    8002,
    20043,
    74736,
    180363912,
    245,
    52648,
    23,
    16240,
    75686,
    400314581,
    72138,
    100000000,
    305,
    278854750,
    34918,
    577,
    362,
    361,
    1,
    57258
].join('\n');

describe('bitPositions', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('tensDigitToString()', function (done) {
        expect(lib.digitPositionToString(1)).eql('');
        expect(lib.digitPositionToString(3)).eql('Thousand');
        done();
    });

    it('tensDigitToString()', function (done) {
        var out = lib.tensDigitToString(1);
        expect(out).eql('Ten');
        done();
    });

    it('digitToString', function (done) {
        var out = lib.digitToString(1);
        expect(out).eql('One');
        done();
    });

    it('isAnyNonZero', function (done) {
        expect(lib.isAnyNonZero(['0', '0', '0'])).eql(false);
        expect(lib.isAnyNonZero(['0', '1', '0'])).eql(true);
        done();
    });

    it('can run on small sample', function (done) {
        var out = lib.run(input);
        expect(out).eql(output);
        done();
    });

    it('can run on small sample', function (done) {
        var out = lib.run(fullInput);
//        console.log(out);
//        expect(out).eql(output);
        done();
    });

});
