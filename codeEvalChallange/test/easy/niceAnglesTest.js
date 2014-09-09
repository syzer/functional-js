/**
 * Created by syzer on 8/27/2014.
 */
/**
 * NICE ANGLES
 Write a program that outputs the value of angle,
 reducing its fractional part to minutes and seconds.
 Input sample:

 The first argument is a path to a file that contains the values
 of angles with their decimal fractions:

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'niceAngles');
var _ = require('lodash');

var input = [
    '330.39991833',
    '0.001',
    '14.64530319',
    '0.25',
    '254.16991217'
].join('\n');

var inputSmall = '330.39991833\n';

var output = [
    '330.23\'59"',
    '0.00\'03"',
    '14.38\'43"',
    '0.15\'00"',
    '254.10\'11"'
].join('\n');



describe('nice angle - angle conversion', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on small sample', function (done) {
        var out = lib.run(input);
        console.log('\nTOTAL:\n',out);
        expect(out).eql(output);
        done();
    });



});
