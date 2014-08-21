/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../src/'; // run on over the test

var lib = require(SRC_DIR + 'labyrinth');

var fs = require('fs');
var input = fs.readFileSync( __dirname + SRC_DIR + 'labirynth.txt');
var output = fs.readFileSync(__dirname + SRC_DIR + 'labirynthOutput.txt');


describe('labyrinth Test', function () {
    afterEach(function (done) {
        setTimeout(done, 10);
    });
    describe('Can load labyrinth', function () {
        it('should decode his saying', function (done) {
            expect(lib.decode(input)).to.eql(output);
            done();
        });
    })
});
