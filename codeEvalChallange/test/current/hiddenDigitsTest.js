/*
 Mixed Content

 Challenge Description:

 You have a string of words and digits divided by comma.
 Write a program which separates words with digits. You shouldn't change the order elements.
 Input sample:

 Your program should accept as its first argument a path to a filename.
 Input example is the following

 8,33,21,0,16,50,37,0,melon,7,apricot,peach,pineapple,17,21
 24,13,14,43,41

 Output sample:

 melon,apricot,peach,pineapple|8,33,21,0,16,50,37,0,7,17,21
 24,13,14,43,41

 As you cas see you need to output the same input string if it has words only or digits only.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'mixedContent');
var _ = require('lodash');

var input = [
    '8,33,21,0,16,50,37,0,melon,7,apricot,peach,pineapple,17,21',
    '24,13,14,43,41',
    'melon,24,apricot,orange,37,banana,banana,banana,apricot,49,4,melon,16,pear,pineapple'
].join('\n');

var output = [
    'melon,apricot,peach,pineapple|8,33,21,0,16,50,37,0,7,17,21',
    '24,13,14,43,41',
    'melon,apricot,orange,banana,banana,banana,apricot,melon,pear,pineapple|24,37,49,4,16'
].join('\n');


describe('idJsonMenu', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

});
