/**
 * Created by syzer on 8/27/2014.
 */
/**
 String Permutations
 Challenge Description:

 Write a program to print out all the permutations of a string in alphabetical order. We consider that digits < upper case letters < lower case letters. The sorting should be performed in ascending order.
 Input sample:

 Your program should accept as its first argument a path to a file containing an input string, one per line. E.g.

 hat
 abc
 Zu6

 Output sample:

 Print to stdout, permutations of the string, comma separated, in alphabetical order. E.g.

 aht,ath,hat,hta,tah,tha
 abc,acb,bac,bca,cab,cba
 6Zu,6uZ,Z6u,Zu6,u6Z,uZ6
 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'polishNotation');
var _ = require('lodash');

var input = [
    '/ * + * + * * * + / / / + 5 4 2 8 1 8 4 6 2 4 0 8 6 3',
    '/ * + / / * / / * / * * / * * 4 7 3 3 1 5 7 4 6 9 9 9 8 5 0 2',
    '+ * + * 9 0 3 0 6',
    '* + * + + + / * * * * / / * + / * / + / * / / / / + + + + 0 2 6 4 9 9 8 3 1 8 5 5 3 8 1 3 0 7 1 7 7 2 4 6 6 4 9 5 0 2',
    '* + + / + * / + + + * * + / + * * * + / / + / * * / / / 8 5 7 6 1 2 6 4 8 4 9 7 3 6 0 2 9 8 1 1 3 5 9 2 4 3 5 0 0',
    '+ * + * * * / + * * * * * * * * / * + 8 8 8 4 5 5 4 2 6 6 1 9 0 2 1 0 9 6 3 1',
    '* + * + / + / / * 0 3 1 9 2 9 3 9 5 4',
    '/ 8 4',
    '+ + + * / * / * * * + + + + + / / + + * + / / 9 5 4 8 7 5 3 1 3 1 4 5 0 6 9 1 8 3 9 2 0 8 2 4',
    '* 3 3',
    '/ + * / * + + * + + * + * + * + 5 3 4 6 1 0 8 4 1 5 3 4 8 6 6 7 3',
    '* / * + 1 7 0 2 2',
    '+ * * 5 3 7 8',
    '+ * / + * / 8 4 6 0 4 7 9',
    '+ + + + + * + + / / / + 0 0 9 5 7 6 8 1 4 8 6 4 4',
    '* * + / * * * * * / * + + / * + + / + + * * / / + 7 0 2 9 0 6 5 1 8 2 1 6 9 8 8 5 3 3 6 2 0 9 3 1 4 4',
    '/ + / * + / 4 4 8 8 9 6 7',
    '* * / / / * 0 1 1 2 6 0 8',
    '+ * + * * * * / * / + + * + + / * + * * * / 8 2 0 4 7 1 0 4 8 3 1 7 2 6 6 3 3 5 9 9 9 6 2',
    '/ 9 3',
    '* 0 0',
    '* + 2 3 4',
    '+ + * + * + + / / / / * * + * + / 7 7 9 6 0 8 3 2 6 8 2 9 0 4 4 6 3 5',
    '* * + * * * * + / / 4 9 8 0 0 4 8 5 7 3 4',
    '* * 4 9 3',
    '+ * + + + * + + / * + * + 0 8 7 5 0 3 2 9 0 8 6 8 2 1',
    '/ * * + + * + + * * * + 6 7 1 2 1 0 4 3 4 3 8 5 8',
    '* * + / + + + + / * + * * * + * + * / / + / * * + * 2 2 3 3 0 5 6 8 7 3 1 6 0 9 6 4 2 9 5 8 1 7 1 4 7 0 9',
    '+ + + * + * + / * * 1 8 4 1 9 6 5 7 4 1 7',
    '* 3 7',
    '* * * + * + / * + + * / + 5 0 9 8 9 0 6 6 7 3 1 9 2 0',
    '* 4 5',
    '+ + * * + + * / / * + + * * + + + / 7 4 2 6 8 8 1 7 9 9 5 1 7 8 3 4 0 1 2',
    '* * * * * * / / + + 1 4 3 2 6 3 1 3 5 2 5',
    '+ / * + + * + / * / / / * + + + / + / * / + 3 7 5 2 9 8 9 4 3 1 6 8 4 9 0 6 2 2 3 0 7 1 8',
    '* + + * 6 7 1 8 3',
    '/ * + + * + + * / / / * / 4 5 5 2 4 1 9 6 2 4 8 8 6 1',
    '/ * 0 7 2',
    '+ * + + + 9 7 3 1 5 4',
    '+ + + * * * * + / * + / / / / * / + + * * / * / * + / * + 2 7 4 5 6 8 3 2 9 6 6 0 4 1 5 9 9 3 1 8 5 7 1 0 8 2 4 7 0 3'
].join('\n');

var output = [
    '',
].join('\n');

var inputSmall = [
    '+ + + * * * * + / * + / / / / * / + + * * / * / * + / * + 2 7 4 5 6 8 3 2 9 6 6 0 4 1 5 9 9 3 1 8 5 7 1 0 8 2 4 7 0 3'
].join('\n');

var outputSmall = [
    '10'
].join('\n');

describe('polish notation', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run on small sample', function (done) {
        var out = lib.run(inputSmall);
        console.log('\nTOTAL:\n', out);
//        expect(out).eql(outputSmall);
        done();
    });

//    it('can run on sample', function (done) {
//        var out = lib.run(input);
////        console.log('\nTOTAL:\n', out);
//        expect(out).eql(output);
//        done();
//    });

});
