/**
 * https://www.codeeval.com/public_sc/223/
 *
 Alternative reality
 Sponsoring Company:

 Challenge Description:

 Have you even wondered about another life? Maybe there is an alternative
 reality where different things are happening. Everything is almost the same, but still a bit different…
 You are walking in one reality, but driving the car in another.
 Here you like golf, and there – basketball. In one reality you changed a $100 banknote
 to five $20 banknotes, while in another – to ten $10 banknotes.
 Today, your task is to count how many alternative versions of money
 change are if you have 1¢, 5¢, 10¢, 25¢, and 50¢ coins.

 So, if you have 11 cents that you need to change, you have four alternative ways how to do it:

 ex:
 1+1+1+1+1+1+1+1+1+1+1
 5+1+1+1+1+1+1
 5+5+1
 10+1
 *
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/';

var lib = require(SRC_DIR + 'numberDivisionPermutations');
var _ = require('lodash');

var input = [
    '100',
    '4',
    '17'
].join('\n');

var output = [
    '292',
    '1',
    '6'
].join('\n');

describe('numberDivisionPermutation', () => {

    //afterEach((done)  => {
    //    setTimeout(done, 60);
    //});
    it('can run', (done) => {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });
});
