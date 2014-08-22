/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../src/'; // run on over the test

var lib = require(SRC_DIR + 'rolercoster');

var fs = require('fs');
//var input1 = fs.readFileSync(__dirname + SRC_DIR + 'labirynth3_1.txt');
var input = 'To be, or not to be: that is the question.\n' +
    "Whether 'tis nobler in the mind to suffer\n" +
    'The slings and arrows of outrageous fortune,\n' +
    'Or to take arms against a sea of troubles,\n' +
    'And by opposing end them? To die: to sleep.';

var output = 'To Be, Or NoT tO bE: tHaT iS tHe QuEsTiOn.\n' +
    "WhEtHeR 'tIs NoBlEr In ThE mInD tO sUfFeR\n" +
    'ThE sLiNgS aNd ArRoWs Of OuTrAgEoUs FoRtUnE,\n' +
    'Or To TaKe ArMs AgAiNsT a SeA oF tRoUbLeS,\n' +
    'AnD bY oPpOsInG eNd ThEm? To DiE: tO sLeEp.';

describe('labyrinth Test', function () {
    afterEach(function (done) {
        setTimeout(done, 1000);
    });
    describe('Can rolecoster', function () {
        it('1 between 3 points', function (done) {
            //console.log(lib.encode(input));
            expect(lib.encode(input)).eql(output);
            done();
        });
    });
});
