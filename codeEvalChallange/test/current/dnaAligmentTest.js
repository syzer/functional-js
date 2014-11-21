/**
 * Created by syzer on 8/27/2014.
 */
/**
 DNA Alignment
 Challenge Description:

 In this challenge, you have to deal with biological code: DNA sequences. DNA sequences are made up of four bases: A, C, T, and G. New DNA sequences are formed by copying the existing ones. However, sometimes, this process is accompanied by errors: one base may be replaced with another; fragments may be deleted or inserted.

 Your task is to compare two related sequences that parted from one another million years ago and changed during this time.

 To do this, bioinformaticians use sequence alignment: they present them in the form of a matrix, indicating gaps with a minus sign (-), so that the maximum number of identical bases (symbols) are under each other.

 For example, for GAAAAAAT and GAAT sequences, one of the possible alignments will be the following:

 GAAAAAAT
 G--A–A–T

 Scoring systems are used to assess the alignment. These are rules, according to which the alignment receives:

 positive points — for each match (when the symbols in two lines match)
 negative points — for mismatch (different symbols in two lines)
 negative points — for indel (an insertion or deletion, i.e. a gap in one of the lines)

 In some scoring systems, indel start “costs“ more than indel extension, because one big gap is biologically more likely to appear than two or more smaller gaps.

 In this challenge, we use the following scoring system:

 Match: +3
 Mismatch: -3
 Indel start: -8
 Indel extension: -1

 Thus, the score for the above sequence is calculated as follows:

 G  A  A  A  A  A  A  T
 G  -  -  A  –  A  –  T
 +3 -8 -1 +3 -8 +3 -8 +3 = -13

 Another version of the same sequences alignment:

 G  A  A  A  A  A  A  T
 G  A  A  -  -  -  -  T
 +3 +3 +3 -8 -1 -1 -1 +3 = 1


 G  A  A  C  C  T  C  G |GCTCG
 G  ? next matching C T C G
 G  -  -  -  C  T  C  G


 G  A  A  A  A  A  A  T | GAACT
 G  A  A...             | no matches



 G  A  A  C  C  T  C  G |GABBTCG
 G  A                   | match OK | match OK
 G  A  M  M  _          | nextmatch T :M M _
 G  A  M  M  _  T  C  G | match OK | match OK


 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'dnaAlignment');
var _ = require('lodash');

var input = [
    'GAAAAAAT | GAAT',
    'GCATGCU | GATTACA'
].join('\n');
  //'3_33M3M' =-3
  //'3MM3M3M  =-3
var output = [
    '1',
    '-3'
].join('\n');


describe('dna aligment', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on input', function (done) {
        var out = lib.run(input);
        console.log(out);
        expect(out).eql(output);
        done();
    });


});
