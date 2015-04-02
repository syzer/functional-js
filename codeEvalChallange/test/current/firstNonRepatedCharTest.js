/**
 * Created by syzer on 3/22/2015.
 */
/*
 https://www.codeeval.com/open_challenges/1/
 Players generally sit in a circle. The first player says the number “1”,
 and each player says next number in turn. However, any number divisible
 by X (for example, three) is replaced by the word fizz, and any divisible
 by Y (for example, five) by the word buzz. Numbers divisible by both become
 fizz buzz. A player who hesitates, or makes a mistake is eliminated from the game.

 Write a program that prints out the final series of numbers where those
 divisible by X, Y and both are replaced by “F” for fizz, “B” for buzz and “FB”
 for fizz buzz.
 Input sample:

 Your program should accept a file as its first argument. The file contains
 multiple separated lines; each line contains 3 numbers that are space
 delimited. The first number is the first divider (X), the second number is
 the second divider (Y), and the third number is how far you should count (N).
 You may assume that the input file is formatted correctly and the numbers
 are valid positive integers.

 For example:
 3 5 10
 2 7 15

 Output sample:
 1 2 F 4 B F 7 8 F B
 1 F 3 F 5 F B F 9 F 11 F 13 FB 15

 Print out the series 1 through N replacing numbers divisible by X with “F”,
 numbers divisible by Y with “B” and numbers divisible by both with “FB”.
 Since the input file contains multiple sets of values, your output should
 print out one line per set. Ensure that there are no trailing empty spaces
 in each line you print.

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'fizzBuzz');
var _ = require('lodash');

var input = [
    '3 5 10',
    '2 7 15'
].join('\n');

var output = [
    '1 2 F 4 B F 7 8 F B',
    '1 F 3 F 5 F B F 9 F 11 F 13 FB 15'
].join('\n');

describe('fizzBuzz', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

    //it('can run on full sample', function (done) {
    //    var out = lib.run(inputFull);
    //    console.log('out:\n', out);
    //    //expect(out).eql(output);
    //    done();
    //});

});
