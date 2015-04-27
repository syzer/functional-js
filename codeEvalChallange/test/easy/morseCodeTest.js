/*
//TODO solve using hoffman codding
 Morse Code

 Challenge Description:

 You have received a text encoded with Morse code and want to decode it.
 Input sample:

 Your program should accept as its first argument a path to a filename. Input example is the following:

 .- ...- ..--- .-- .... .. . -.-. -..-  ....- .....
 -... .... ...--

 Each letter is separated by space char, each word is separated by 2 space chars.
 Output sample:

 Print out decoded words. E.g.

 AV2WHIECX 45
 BH3
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'morseCode');
var _ = require('lodash');

var input = [
    '.- ...- ..--- .-- .... .. . -.-. -..-  ....- .....',
    '-... .... ...--'
].join('\n');

var output = [
    'AV2WHIECX 45',
    'BH3'
].join('\n');


describe('morseCode', function () {

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
