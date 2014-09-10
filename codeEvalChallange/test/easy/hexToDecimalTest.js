/**
 * Created by syzer on 8/27/2014.
 */
/**
 Hex to Decimal
 Challenge Description:

 You will be given a hexadecimal (base 16) number. Convert it into decimal (base 10).
 Input sample:

 Your program should accept as its first argument a path to a filename. Each line in this file contains a hex number. You may assume that the hex number does not have the leading 'Ox'. Also all alpha characters (a through f) in the input will be in lowercase. E.g.

 9f
 11

 Output sample:

 Print out the equivalent decimal number. E.g.

 159
 17
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'hexToDecimal');
var _ = require('lodash');

var input = [
    '9f',
    '11'
].join('\n');

var output = [
    '159',
    '17'
].join('\n');

describe('fibonacci', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

//    it('can run on smallest sample', function (done) {
//        var out = lib.run(inputSmall);
////        console.log('\nTOTAL:\n', out);
//        expect(out).eql(outputSmall);
//        done();
//    });

    it('can run on small sample', function (done) {
        var out = lib.run(input);
        console.log('\nTOTAL:\n', out);
//        expect(out).eql(output);
        done();
    });

});
