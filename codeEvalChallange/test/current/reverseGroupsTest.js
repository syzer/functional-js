/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'reverseGroups');

var fs = require('fs');
//var input1 = fs.readFileSync(__dirname + SRC_DIR + 'labirynth3_1.txt');
var input =
    '21,22,23,24,25,26,27,28,29,30,31,32,33;6\n' +
    '82,83,84,85,86,87,88,89,90,91;4\n'+
    '1,2,3,4,5;2\n' +
    '1,2,3,4,5;3\n';

var output =
    '26,25,24,23,22,21,32,31,30,29,28,27,33\n' +
    '85,84,83,82,89,88,87,86,90,91\n' +
    '2,1,4,3,5\n' +
    '3,2,1,4,5\n';

var input2 =
    '9,10,11,12,13,14,15,16;3\n'+
    '1,2,3,4,5;3\n'+
    '3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22;8\n'+
    '82,83,84,85,86,87,88,89,90,91;4\n'+
    '16,17,18,19,20,21,22,23,24,25;6\n'+
    '62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79;5\n'+
    '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46;8\n'+
    '1,2,3,4,5;2\n'+
    '21,22,23,24,25,26,27,28,29,30,31,32,33;6\n'+
    '23,24,25,26,27,28,29,30,31,32,33,34;6\n'+
    '63,64,65,66,67,68,69,70,71,72;6\n'+
    '19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36;7\n'+
    '71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88;2\n'+
    '4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22;6\n'+
    '67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84;5\n'+
    '64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83;2\n'+
    '78,79,80,81,82,83,84,85,86,87,88;5\n'+
    '22,23,24,25,26,27,28,29,30;3\n'+
    '3,4,5,6,7,8,9,10,11,12,13,14,15,16;7\n'+
    '100,101;1\n';

describe('reverse groups Test', function () {
    afterEach(function (done) {
        setTimeout(done, 600);
    });

    it('can reverse', function (done) {
        console.log(lib.run(input));
        expect(lib.run(input)).eql(output);
        done();
    });
});
