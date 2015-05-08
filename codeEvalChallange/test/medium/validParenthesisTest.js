/**
 * https://www.codeeval.com/open_challenges/68/
 *
 *  Given a string comprising just of the characters (,),{,},[,] determine if it is well-formed or not.
 Input sample:

 Your program should accept as its first argument a path to a filename. Each line in this file contains a string comprising of the characters mentioned above. E.g.

 ()
 ([)]

 Output sample:

 Print out True or False if the string is well-formed. E.g.

 True
 False
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'validParenthesis');
var _ = require('lodash');

var input = [
    '()',
    '([)]',
    '{[([{[}]])]}',
    '){}{}',
    '(){}{}'
].join('\n');

var output = [
    'True',
    'False',
    'False',
    'False',
    'True'
].join('\n');

var inputFull = [
    '([)]',
    '{',
    '(((({{[]}}))))',
    '(){}{}',
    '()[]{}',
    '{[]}{}{{',
    '((())}()',
    '([]())',
    '({()})',
    '()',
    '[[[]]]',
    ')([',
    '(]',
    '[){[[}}}](',
    '{]()(',
    '[]({})',
    '((){})',
    '[{}][{]}}',
    '{}{()}',
    '(({(})))'
].join('\n');

var fullOutput = [
    'False',
    'False',
    'True',
];

describe('validParenthesis', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
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
