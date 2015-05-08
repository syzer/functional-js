/**
 * https://www.codeeval.com/open_challenges/11/
 *
 *     30
        |
      ____
     |   |
     8   52
     |
    ____
   |   |
   3  20
       |
      ____
     |   |
     10  29
 *
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/';

var lib = require(SRC_DIR + 'lowestCommonAncestor');
var _ = require('lodash');

var input = [
    //'8 52',
    //'3 29',
    '20 29',
    //'30 3',
    //'52 30',
    //'10 3',
    //'3 10'
].join('\n');

var output = [
    //'30',
    //'8',
    '20',
    //'30',
    //'30',
    //'8',
    //'8'
].join('\n');

var inputFull = [
    '29 10',
    '30 29',
    '3 30',
    '20 3',
    '20 10',
    '52 30',
    '20 10',
    '8 20',
    '29 52',
    '20 29',
    '52 30',
    '8 52',
    '30 29',
    '3 20',
    '8 20',
    '10 3',
    '20 29',
    '8 10',
    '20 52'
].join('\n');

var outputFull = [
    '20',
    '30',
    '30',
    '8',
    '8',
    '30',
    '8',
    '30',
    '30',
    '8',
    '30',
    '30',
    '30',
    '8',
    '30',
    '8',
    '8',
    '30',
    '30'
].join('\n');

describe('lowestCommonAncestor', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

    //it('can run full', function (done) {
    //    var out = lib.run(inputFull);
    //    console.log('out:\n', out);
    //    expect(out).eql(outputFull);
    //    done();
    //});

});
