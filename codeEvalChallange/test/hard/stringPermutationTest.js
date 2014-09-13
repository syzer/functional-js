/**
 * Created by syzer on 8/27/2014.
 */
/**
 String Permutations
 Challenge Description:

 Write a program to print out all the permutations of a string in alphabetical order. We consider that digits < upper case letters < lower case letters. The sorting should be performed in ascending order.
 Input sample:

 Your program should accept as its first argument a path to a file containing an input string, one per line. E.g.

 hat
 abc
 Zu6

 Output sample:

 Print to stdout, permutations of the string, comma separated, in alphabetical order. E.g.

 aht,ath,hat,hta,tah,tha
 abc,acb,bac,bca,cab,cba
 6Zu,6uZ,Z6u,Zu6,u6Z,uZ6
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'stringPermutation');
var _ = require('lodash');

var input = [
    'hat',
    'abc',
    'Zu6'
].join('\n');

var output = [
    'aht,ath,hat,hta,tah,tha',
    'abc,acb,bac,bca,cab,cba',
    '6Zu,6uZ,Z6u,Zu6,u6Z,uZ6'
].join('\n');

var inputSmall = [
    'hat'
].join('\n');

var outputSmall = [
    'aht,ath,hat,hta,tah,tha'
].join('\n');

describe('string permutation', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on small sample', function (done) {
        var out = lib.run(inputSmall);
//        console.log('\nTOTAL:\n', out);
        expect(out).eql(outputSmall);
        done();
    });

    it('can run on sample', function (done) {
        var out = lib.run(input);
//        console.log('\nTOTAL:\n', out);
        expect(out).eql(output);
        done();
    });

});
