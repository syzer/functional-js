/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../src/'; // run on over the test

var lib = require(SRC_DIR + 'labyrinth2');

var fs = require('fs');
var input = fs.readFileSync(__dirname + SRC_DIR + 'labirynth3_1.txt');
//var input2 = fs.readFileSync(__dirname + SRC_DIR + 'labirynth3_2.txt');
//var input3 = fs.readFileSync(__dirname + SRC_DIR + 'labirynth4.txt');
//var input4 = fs.readFileSync(__dirname + SRC_DIR + 'labirynth5.txt');
//var input = fs.readFileSync(__dirname + SRC_DIR + 'labirynth.txt');
//var input = fs.readFileSync(__dirname + SRC_DIR + 'labirynthUltimate.txt');
//var input = fs.readFileSync(__dirname + SRC_DIR + 'labirynthReal.txt');
//var output = fs.readFileSync(__dirname + SRC_DIR + 'labirynth3_1out.txt');


describe('labyrinth Test', function () {
    afterEach(function (done) {
        setTimeout(done, 60);
    });
    describe('Cartesian distance', function () {
        it('1 between 3 points', function (done) {
            var point1 = [0, 0];
            var point2 = [0, 1];
            var point3 = [1, 0];
            var point4 = [1, 1];
            var point5 = [1, 2];
            expect(lib.cartesianDistance(point1, point2)).to.eql(1);
            expect(lib.cartesianDistance(point1, point3)).to.eql(1);
            expect(lib.cartesianDistance(point1, point4)).to.eql(2);
            done();
        });
    });
    describe('map distance', function () {
        it('1 between 3 points', function (done) {
            var point1 = [0, 0];
            var point2 = [0, 1];
            var point3 = [1, 0];
            var point4 = [1, 1];
            var point5 = [1, 2];

            expect(lib.mapDistance(point1, point2)).to.eql(1);
            expect(lib.mapDistance(point1, point2)).to.eql(1);
            expect(lib.mapDistance(point1, point2)).to.eql(1);
            expect(lib.mapDistance(point1, point5)).to.eql(3);
            done();
        });
    });
    describe('find Children', function () {
        it('initial test', function (done) {
            var array = [
                [ 4, 0 ],
                [ 4, 1 ],
                [ 4, 2 ],
                [4, -1],
                [5, 1]
            ];
            var point = [4, 1];
            expect(lib.findAttached(point, array)).to.eql([[ 4, 0 ], [ 4, 2 ], [ 5, 1 ]]);
            done();
        });
    });
    describe('find route', function () {
        it('initial test', function (done) {
            lib.decode(input);
            done();
        });
    })
});
