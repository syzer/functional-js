/**
 * Created by syzer on 3/22/2015.
 */
/*Type Ahead
 https://www.codeeval.com/public_sc/55/

 Your task is to build a type-ahead feature for an upcoming product.

 When the user enters a word or set of words, we want to be able to
 "predict" what they're going to type next with some level of
 accuracy. We've chosen to implement this using the N-Gram
 algorithm defined here.

 Your program should return a tuple of predictions sorted high to
 low based on the prediction score (upto a maximum of three decimal
 places, or pad with zeroes upto three decimal places i.e. 0.2 should
 be shown as 0.200), (if predictions share the same score, they are sorted
 alphabetically.) Words should be split by whitespace with all
 non-alphanumeric characters stripped off the beginning and end.
 Prediction scores are calculated like this: Occurrences of a word
 after an N-gram / total number of words after an N-gram e.g. for
 an N-gram of length 2:
 ONE TWO ONE TWO THREE TWO THREE

 "TWO" has the following predictions:
 THREE:0.666,ONE:0.333
 "THREE" occurred 2 times after a "TWO" and "ONE" occurred 1 time after a "TWO", for a total of 3 occurrences after a "TWO".

 Your program will run against the following text, ignoring all punctuation i.e.
 Hardcode it into your program:

 Mary had a little lamb its fleece was white as snow;
 And everywhere that Mary went, the lamb was sure to go.
 It followed her to school one day, which was against the rule;
 It made the children laugh and play, to see a lamb at school.
 And so the teacher turned it out, but still it lingered near,
 And waited patiently about till Mary did appear.
 "Why does the lamb love Mary so?" the eager children cry;
 "Why, Mary loves the lamb, you know" the teacher did reply."

 Input sample:
 Your program should accept as its first argument a path to a filename.The input file contains several lines.
 Each line is one test case. Each line contains a number followed by a string, separated by a comma. E.g.
 2,the
 The first number is the n-gram length.
 The second string is the text printed by the user and whose prediction you have to print out.

 Output sample:
 For each set of input produce a single line of output which is the predictions for what
 the user is going to type next. E.g.
 lamb,0.375;teacher,0.250;children,0.125;eager,0.125;rule,0.125

 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'typeAhead');
var _ = require('lodash');

var input = [
    '2,the',
    '2,a',
    '2,It',
    '2,it',
    '3,does the',
    '4,lamb you know',
    '4,turned it out',
    '4,against the rule',
    '3,that Mary',
    '4,a little lamb',
    '4,as snow And'
].join('\n');

var inputFull = [
    '2,a',
    '3,to see',
    '2,children',
    '3,does the',
    '4,lamb you know',
    '4,the lamb you',
    '2,it',
    '4,lingered near And',
    '3,patiently about',
    '3,rule It',
    '4,but still it',
    '2,lamb',
    '2,the',
    '3,that Mary',
    '4,a little lamb',
    '4,as snow And',
    '4,turned it out',
    '4,lamb you know',
    '2,patiently',
    '2,waited',
    '3,cry Why',
    '2,It',
    '2,it',
    '4,And so the',
    '3,Mary so',
    '3,the lamb',
    '2,her',
    '3,the rule',
    '2,Why',
    '2,children',
    '3,a lamb',
    '3,the children',
    '4,Mary had a',
    '2,which',
    '3,the lamb',
    '2,patiently',
    '3,snow And',
    '4,as snow And',
    '4,against the rule',
    '4,to school one'
].join('\n');

var output = [
    'lamb,0.375;teacher,0.250;children,0.125;eager,0.125;rule,0.125',
    'lamb,0.500;little,0.500',
    'followed,0.500;made,0.500',
    'lingered,0.500;out,0.500',
    'lamb,1.000',
    'the,1.000',
    'but,1.000',
    'It,1.000',
    'went,1.000',
    'its,1.000',
    'everywhere,1.000'
].join('\n');

describe('typeAhead', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    var str = lib.str;

    it('nGramText win more than 4', function (done) {
        var out = lib.nGramText2(str, 4);
        //console.log(out);
        expect(out['Mary had a']).eql({little: 1});
        done();
    });

    it('can run', function (done) {
        var out = lib.run(input);
        //console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

    it('stripNonAlpha', function (done) {
        var out = lib.stripNonAlpha(lib.text);
        expect(out).to.be.a('string');
        done();
    });

    it('nGramText', function (done) {
        var out = lib.nGramText2(str);
        expect(out.the).eql({lamb: 3, rule: 1, children: 1, teacher: 2, eager: 1});
        done();
    });

    it('nGramText bigram', function (done) {
        var out = lib.nGramText2(str, 2);
        expect(out.the).eql({lamb: 3, rule: 1, children: 1, teacher: 2, eager: 1});
        done();
    });

    it('nGramText win more than 2', function (done) {
        var out = lib.nGramText2(str, 3);
        expect(out['does the']).eql({lamb: 1});
        done();
    });

    it('can run on full sample', function (done) {
        var out = lib.run(inputFull);
        console.log('out:\n', out);
        //expect(out).eql(output);
        done();
    });

});
