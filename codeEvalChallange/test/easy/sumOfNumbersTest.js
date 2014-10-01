/**
 * Created by syzer on 8/27/2014.
 */
/**
 * Given numbers x and n, where n is a power of 2,
 * print out the smallest multiple of n which is greater than or equal to x.
 * Do not use division or modulo operator.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'sumNumbers');
var _ = require('lodash');

var input = [
    '5',
    '12'
].join('\n');

var output = [
    '17'
].join('\n');

var realInput = [
    '1504,8',
    '1586,128',
    '2148,1024',
    '84,64',
    '60,2',
    '1874,4',
    '742,256',
    '831,16',
    '1390,512',
    '1522,32'
].join('\n');

describe('sum of numbers', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        expect(out).eql(output);
        done();
    });

//    it('can run on real sample', function (done) {
//        var out = lib.run(realInput);
////        console.log(out);
////        expect(out).eql(output);
//        done();
//    });

});
