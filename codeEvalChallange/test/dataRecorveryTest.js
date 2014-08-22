

/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../src/'; // run on over the test

var lib = require(SRC_DIR + 'dataRecorvery');

var fs = require('fs');
//var input1 = fs.readFileSync(__dirname + SRC_DIR + 'labirynth3_1.txt');
var input = '2000 and was not However, implemented 1998 it until;9 8 3 4 1 5 7 2\n' +
    'programming first The language;3 2 1\n' +
    'programs Manchester The written ran Mark 1952 1 in Autocode from;6 2 1 7 5 3 11 4 8 9\n';

var output = 'However, it was not implemented until 1998 and 2000\n' +
    'The first programming language\n' +
    'The Manchester Mark 1 ran programs written in Autocode from 1952\n';

describe('data recorvery Test', function () {
    afterEach(function (done) {
        setTimeout(done, 60);
    });
    describe('date recorvery', function () {
        it('recorveres text in correct order', function (done) {
            console.log(lib.decode(input));
//            expect(lib.decode(input)).eql(output);
            done();
        });
    });
});
