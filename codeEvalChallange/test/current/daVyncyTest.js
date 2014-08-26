/**
 * Created by syzer on 8/4/2014.
 */
/**
 * https://www.codeeval.com/public_sc/77/
 *  The Da Vyncy Code

 You were reading The Da Vyncy Code, the translation of a famous murder mystery novel into Python. The Code is finally revealed on the last page. You had reached the second to last page of the novel, and then you went to take a bathroom break.

 While you were in the bathroom, the Illuminati snuck into your room and shredded the last page of your book. You had 9 backup copies of the book just in case of an attack like this, but the Illuminati shredded the last page from each of the those books, too. Then they propped up a fan, aimed it at the remains, and turned it on at high-speed.

 The last page of your book is now in tatters.

 However, there are many text fragments floating in the air. You enlist an undergraduate student for a 'summer research project' of typing up these fragments into a file. Your mission: reassemble the last page of your book.

 Problem Description
 =============

 (adapted from a problem by Julie Zelenski)

 Write a program that, given a set of fragments (ASCII strings), uses the following method (or a method producing identical output) to reassemble the document from which they came:

 At each step, your program searches the collection of fragments. It should find the pair of fragments with the maximal overlap match and merge those two fragments. This operation should decrease the total number of fragments by one. If there is more than one pair of fragments with a maximal overlap, you may break the tie in an arbitrary fashion.Fragments must overlap at their start or end. For example:

 - "ABCDEF" and "DEFG" overlap with overlap length 3
 - "ABCDEF" and "XYZABC" overlap with overlap length 3
 - "ABCDEF" and "BCDE" overlap with overlap length 4
 - "ABCDEF" and "XCDEZ" do *not* overlap (they have matching characters in the middle, but the overlap does not extend to the end of either string).

 Fear not - any test inputs given to you will satisfy the property that the tie-breaking order will not change the result, as long as you only ever merge maximally-overlapping fragments. Bonus points if you can come up with an input for which this property does not hold (ie, there exists more than 1 different final reconstruction, depending on the order in which different maximal-overlap merges are performed) -- if you find such a case, submit it in the comments to your code!

 All characters must match exactly in a sequence (case-sensitive). Assume that your undergraduate has provided you with clean data (i.e., there are no typos).
 Input sample:

 Your program should accept as its first argument a path to a filename.
 Each line in this file represents a test case.
 Each line contains fragments separated by a semicolon,
 which your assistant has painstakingly transcribed from the shreds left by the Illuminati.
 You may assume that every fragment has length at least 2 and at most 1022
 (excluding the trailing newline, which should *not* be considered part of the fragment).
 E.g. Here are two test cases.

 O draconia;conian devil! Oh la;h lame sa;saint!

 O draconian devil! Oh lame saint!

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'daVyncyStringsConcats');
var _ = require('lodash');

var input = 'O draconia;conian devil! Oh la;h lame sa;saint!\n';

var output = 'O draconia;conian devil! Oh la;h lame sa;saint!\n';



describe('daVynchyTest', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('find Overlaping', function (done) {
        var str1 = input.split(';')[0];
        var str2 = input.split(';')[1];
        console.log(lib.findOverlaping(str1, str2));

        done();
    });

    it('finds its', function (done) {
//        expect(lib.run(input)).eql(output);
        done();
    });

});
