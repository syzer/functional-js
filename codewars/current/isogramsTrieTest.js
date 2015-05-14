/**
 * 7 kyu
 * An isogram is a word that has no repeating letters,
 * consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case.
 */
var expect = require('chai').expect;
var SRC_DIR = './../src/';

var lib = require(SRC_DIR + 'isogramsTrie');
var _ = require('lodash');

// -- ignore letter case
var input = [
    "Dermatoglyphics",
    "aba",
    "moOse"
].join('\n');

var output = [
    'true',
    'false',
    'false'
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
