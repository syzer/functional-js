/**
 * Created by syzer on 8/27/2014.
 */
/**
 Age distribution

 You're responsible for providing a demographic report for your local school
 district based on age. To do this, you're going determine which 'category'
 each person fits into based on their age.

 The person's age will determine which category they should be in:

 If they're from 0 to 2 the child should be with parents print : 'Still in Mama's arms'
 If they're 3 or 4 and should be in preschool print : 'Preschool Maniac'
 If they're from 5 to 11 and should be in elementary school print : 'Elementary school'
 From 12 to 14: 'Middle school'
 From 15 to 18: 'High school'
 From 19 to 22: 'College'
 From 23 to 65: 'Working for the man'
 From 66 to 100: 'The Golden Years'
 If the age of the person less than 0 or more than 100 -
 it might be an alien - print: "This program is for humans"
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'ageDistribution');
var _ = require('lodash');

var input = [
    0,
    19
].join('\n');

var output = [
    "Still in Mama's arms",
    'College'
].join('\n');

describe('age distributions', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
//        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

});
