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

 - 'ABCDEF' and 'DEFG' overlap with overlap length 3
 - 'ABCDEF' and 'XYZABC' overlap with overlap length 3
 - 'ABCDEF' and 'BCDE' overlap with overlap length 4
 - 'ABCDEF' and 'XCDEZ' do *not* overlap (they have matching characters in the middle, but the overlap does not extend to the end of either string).

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
var mocha = require('mocha');
var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'daVyncyStringsConcats');
var _ = require('lodash');

var input = 'O draconia;conian devil! Oh la;h lame sa;saint!\n';

var output = 'O draconian devil! Oh lame saint!\n';

var inputLong = 'm quaerat voluptatem.;pora incidunt ut labore et d;, consectetur, adipisci velit;olore magnam aliqua;idunt ut labore et dolore magn;uptatem.;i dolorem ipsum qu;iquam quaerat vol;psum quia dolor sit amet, consectetur, a;ia dolor sit amet, conse;squam est, qui do;Neque porro quisquam est, qu;aerat voluptatem.;m eius modi tem;Neque porro qui;, sed quia non numquam ei;lorem ipsum quia dolor sit amet;ctetur, adipisci velit, sed quia non numq;unt ut labore et dolore magnam aliquam qu;dipisci velit, sed quia non numqua;us modi tempora incid;Neque porro quisquam est, qui dolorem i;uam eius modi tem;pora inc;am al';

var outputLong = 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.';

describe('daVynchyTest', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });


    it('can produce long output', function (done) {
        var out = lib.run(inputLong);
        expect(out).eql(outputLong);

        // eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        // incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        // incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        // magnam aliquam quaerat voluptatem.
        // magnam aliquam quaerat voluptatem.

//        console.log('\n\n\n\n\n-------------\n');
        done();
    });

    it('merges on ends this should be 7', function (done) {
        var input1 = 'Neque porro quisquam est, qui dolorem ipsum quia ' +
            'dolor sit amet, consectetur, adipisci velit, sed quia non numquam ei';
        //*****/
        var input2 = 'iquam eius modi tempora incidunt ut labore ' +
            'et dolore magnam al';

        var expected = 'Neque porro quisquam est, qui dolorem ipsum quia ' +
            'dolor sit amet, consectetur, adipisci velit, sed quia non numquam ei' +
            //quam ei
            'us modi tempora incidunt ut labore et dolore magnam al';

        var input1Short = 'sed quia non numquam ei';
        var input2Short = 'iquam eius modi tempora';
        var expectedShort = 'sed quia non numquam eius modi tempora';

//        'quam ei' 7
        var out = lib.sharedSuffixMiddle(input1, input2);
        var out2 = lib.sharedSuffixMiddle(input2, input1);
        expect(out2).eql(out);
        expect(out2[0]).eql(7);
        expect(out2[1]).eql(expected);

        var shortOut = lib.sharedSuffixMiddle(input1Short, input2Short);
        expect(shortOut[1]).eql(expectedShort);

        done();
    });

    it('find shared middle prefix', function (done) {
        var middle = 'O draconiaCUTMEOFF';
        var prefix = 'conian devil! Oh la';
        var out = lib.sharedMiddlePrefix(middle, prefix);
        expect(out).eql([ 6, 'O draconian devil! Oh la' ]);
        done();
    });

    it('find shared middle prefix2', function (done) {
        var middle = 'O draconian devil! Oh la';
        var prefix = 'h lame sa';
        var out = lib.sharedMiddlePrefix(middle, prefix);
        expect(out).eql([ 5, 'O draconian devil! Oh lame sa' ]);
        done();
    });

    it('find shared middle prefix3', function (done) {
        var middle = 'O draconian devil! Oh lame sa';
        var prefix = 'saint!';
        var out = lib.sharedMiddlePrefix(middle, prefix);
        expect(out).eql([ 3, 'O draconian devil! Oh lame saint!' ]);
        done();
    });

    it('does not find when not matching', function (done) {
        var middle = 'O draconia';
        var prefix = 'h lame sa';
        expect(lib.sharedMiddlePrefix(middle, prefix)[0]).eql(2);
        // [ 2, 'h lame sa' ]; or [ 2, 'O draconia']

        done();
    });

    it('can find best middle prefix, when given list', function (done) {

        var list = input.split(';');
        var prefix = list.pop();   // To match
        var array = [];
        _(list).forEach(function (word) {
            array.push(lib.sharedMiddlePrefix(word, prefix));
        });
        expect(_(array)
                .max(function (el) {
                    return el[0];
                })
                .value(),
            [ 3, 'h lame saint!\n' ]
        );

        done();
    });

    it('can produce small output', function (done) {
        var out = lib.run(input);
        expect(out).eql(output);
        done();
    });

    it('can find strings that are alraedy merged', function (done) {
        var input2 = 'Neque porro qui;Neque porro quisquam est, qui dolorem i';
        var input = 'Neque porro quisquam est, qui dolorem i;Neque porro qui';
        var expected = 'Neque porro quisquam est, qui dolorem i';
        var out = lib.run(input);
        expect(out).eql(expected);
        expect(out).eql(lib.run(input2));
        done();
    });

    it('find will not cut the good reconstructed string', function (done) {

        var input =
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.' +
            ';Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora inc' +
            ';Neque porro quisquam al';


        var data = input.split(';');
        var out = lib.sharedMiddlePrefix(data[0], data[1]);
        var out2 = lib.sharedMiddlePrefix(data[1], data[0]);
        var out3 = lib.sharedMiddlePrefix(data[1], data[2]);
        var out4 = lib.sharedMiddlePrefix(data[2], data[1]);
        expect(out).eql(out2);
        expect(out3).eql(out4);

        done();
    });

    it('ovelapses as the emaple says', function (done) {
        var input = [
            ['ABCDEF', 'DEFG'],
            ['ABCDEF', 'XYZABC'],
            ['ABCDEF', 'BCDE'],
            ['ABCDEF', 'XCDEZ']
        ];

        var expected = [
            3,
            3,
            4,
            0
        ];
        //TODO


        done();
    });

    it('find shared suffix prefix', function (done) {

        var overlap3Fixture = 'O draconia';
        var overlap4Fixture = 'conian devil! Oh la';
        var prefix = lib.sharedStart(['interspecies', 'interstelar', 'interstate']);

        done();
    });

    it('find shared prefix', function (done) {

        var prefix = lib.sharedStart(['interspecies', 'interstelar', 'interstate']);
        expect(prefix).eql('inters');

        done();
    });

});
