/**
 * Created by syzer on 8/27/2014.
 */
/**
 String List
 Challenge Description:

 GYou are given a number N and a string S. Print all of the possible ways to write
 a string of length N from the characters in string S, comma delimited
 in alphabetical order.
 Input sample:

 The first argument will be the path to the input filename
 containing the test data.
 Each line in this file is a separate test case.
 Each line is in the format: N,S i.e. a positive integer,
 followed by a string (comma separated).

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'stringList');
var _ = require('lodash');

var input = [
    '1,aa',
    '2,ab',
    '3,pop'
].join('\n');

var inputSimple = [
    '2,ab'
].join('\n');

var output = [
    'a',
    'aa,ab,ba,bb',
    'ooo,oop,opo,opp,poo,pop,ppo,ppp'
].join('\n');


describe('string Substitutions', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on small sample', function (done) {
        var out = lib.run(inputSimple);
        console.log('\nTOTAL:\n',out);
//        expect(out).eql(output);
        done();
    });



});
