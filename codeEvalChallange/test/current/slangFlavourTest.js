/*
 https://www.codeeval.com/open_challenges/174/

 Long serious texts are boring. Write a program that will make texts more informal:
 replace every other end punctuation mark (period ‘.’, exclamation mark ‘!’,
 or question mark ‘?’) with one of the following slang phrases, selecting them one
 after another:

 ‘, yeah!’
 ‘, this is crazy, I tell ya.’
 ‘, can U believe this?’
 ‘, eh?’
 ‘, aw yea.’
 ‘, yo.’
 ‘? No way!’
 ‘. Awesome!’

 The result should be funny.

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'slangFlavor');
var _ = require('lodash');

var input = [
    'Lorem ipsum dolor sit amet. Mea et habeo doming praesent. Te inani utroque recteque has, sea ne fugit verterem!',
    'Usu ei scripta phaedrum, an sed salutatus definiebas? Qui ut recteque gloriatur reformidans. Qui solum aeque sapientem cu.',
    'Eu nam nusquam quaestio principes.'
].join('\n');

var output = [
    'Lorem ipsum dolor sit amet. Mea et habeo doming praesent, yeah! Te inani utroque recteque has, sea ne fugit verterem!',
    'Usu ei scripta phaedrum, an sed salutatus definiebas, this is crazy, I tell ya. Qui ut recteque gloriatur reformidans. Qui solum aeque sapientem cu, can U believe this?',
    'Eu nam nusquam quaestio principes.'
].join('\n');


describe('slangFlavour', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.runAll(input);
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
