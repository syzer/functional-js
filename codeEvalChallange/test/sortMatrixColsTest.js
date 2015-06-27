/**
 * https://www.codeeval.com/browse/200/
 *
 * Sort matrix columns
 Challenge Description:

 You have a matrix of integers of N*N size. You should sort the columns in the matrix by first row in ascending. If the numbers in the first line are equal - you should sort it by the lowest number of second line, if numbers in the second line are also equal you should sort it by the next row etc.

 Sort matrix columns example:
 Input sample:

 The first argument is a path to a file. Each row contains a test case with an integer matrix that is recorded in one line. Each new row of this matrix divided by the character " | ".

 For example:
 Output sample:

 Print out the sorted matrix in the same format as input.

 For example:
 Constraints:

 The number of columns is equal to the number of rows in the matrix and may be in range from 3 to 15.
 Integer numbers in the matrix are in range from -100 to 100.
 The number of test cases is 40.

 |  -3  29 -3 |        |  -3  -3 29 |
 | -17 69 -17 |        | -17 -17 69 |
 |  44  3  8  |        |  8  44  3  |

 *
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/';

var lib = require(SRC_DIR + 'sortMatrixColumn');
var _ = require('lodash');

var input = [
    '-3 29 -3 | -17 69 -17 | 44 3 8',
    '25 39 -26 -21 | -81 -98 -91 27 | 32 -87 67 98 | -90 -79 18 9',
    '26 -10 39 | -62 66 97 | 22 85 36'
].join('\n');

var output = [
    '-3 -3 29 | -17 -17 69 | 8 44 3',
    '-26 -21 25 39 | -91 27 -81 -98 | 67 98 32 -87 | 18 9 -90 -79',
    '-10 26 39 | 66 -62 97 | 85 22 36'
].join('\n');

describe('sortMatrixColumn', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });

    //it('can run full', function (done) {
    //    var out = lib.run(inputFull);
    //    console.log('out:\n', out);
    //    expect(out).eql(outputFull);
    //    done();
    //});

});
