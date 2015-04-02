/**
 * Created by syzer on 3/22/2015.
 */
/*
 https://www.codeeval.com/open_challenges/29/

 You are given a sorted list of numbers with duplicates. Print out the sorted list with duplicates removed.
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'uniqueElements');
var _ = require('lodash');

var input = [
    '1,1,1,2,2,3,3,4,4',
    '2,3,4,5,5'
].join('\n');

var output = [
    '1,2,3,4',
    '2,3,4,5'
].join('\n');

describe('uniqueElements', function () {

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
