/**
 * https://www.codeeval.com/open_challenges/87/
 * Query Board

 Challenge Description:

 There is a board (matrix). Every cell of the board contains one integer, which is 0 initially.

 The next operations can be applied to the Query Board:
 SetRow i x: it means that all values in the cells on row "i" have been changed to value "x" after this operation.
 SetCol j x: it means that all values in the cells on column "j" have been changed to value "x" after this operation.
 QueryRow i: it means that you should output the sum of values on row "i".
 QueryCol j: it means that you should output the sum of values on column "j".

 The board's dimensions are 256x256
 "i" and "j" are integers from 0 to 255
 "x" is an integer from 0 to 31
 Input sample:

 Your program should accept as its first argument a path to a filename. Each line in this file contains an operation of a query. E.g.

 SetCol 32 20
 SetRow 15 7
 SetRow 16 31
 QueryCol 32
 SetCol 2 14
 QueryRow 10
 SetCol 14 0
 QueryRow 15
 SetRow 10 1
 QueryCol 2

 Output sample:

 For each query, output the answer of the query. E.g.

 5118
 34
 1792
 3571
 *
 */
const expect = require('chai').expect;
const SRC_DIR = './../../src/easy/';

const lib = require(SRC_DIR + 'queryBoard')
const _ = require('lodash')

const input = [
    'SetCol 32 20',
    'SetRow 15 7',
    'SetRow 16 31',
    'QueryCol 32',
    'SetCol 2 14',
    'QueryRow 10',
    'SetCol 14 0',
    'QueryRow 15',
    'SetRow 10 1',
    'QueryCol 2'
].join('\n')

const output = [
    '5118',
    '34',
    '1792',
    '3571'
].join('\n')

const fullInput = [
    'SetRow 25 16',
    'QueryCol 57',
    'QueryRow 220',
    'QueryRow 46',
    'SetRow 73 12',
    'QueryRow 178',
    'QueryCol 7',
    'QueryCol 146',
    'QueryRow 230',
    'QueryRow 10',
    'QueryCol 254',
    'SetCol 161 23',
    'SetRow 40 25',
    'QueryCol 178',
    'SetCol 110 29',
    'SetCol 0 6',
    'SetRow 204 2',
    'QueryRow 206',
    'QueryCol 222',
    'SetRow 242 18',
    'QueryCol 70',
    'QueryRow 12',
    'SetRow 68 6',
    'SetRow 107 13',
    'QueryRow 81',
    'QueryRow 66',
    'QueryCol 243',
    'QueryCol 252',
    'QueryRow 234',
    'QueryRow 176',
    'QueryCol 240',
    'QueryRow 190',
    'QueryRow 104',
    'QueryRow 195',
    'SetRow 150 18',
    'QueryCol 66',
    'SetRow 42 30',
    'QueryCol 218',
    'QueryRow 35',
    'SetRow 49 30',
    'SetRow 160 6',
    'QueryCol 64',
    'SetCol 205 1',
    'QueryCol 199',
    'SetRow 126 25',
    'SetRow 158 3',
    'QueryCol 24',
    'QueryRow 3',
    'QueryRow 95',
    'SetRow 238 5',
    'QueryRow 217',
    'SetRow 227 2',
    'QueryRow 215',
    'SetRow 229 31',
    'SetCol 85 29',
    'QueryCol 76',
    'SetCol 166 0',
    'QueryCol 210',
    'SetRow 96 30',
    'QueryCol 78',
    'SetCol 123 15',
    'SetRow 152 8',
    'QueryRow 197',
    'SetRow 65 1',
    'QueryCol 172',
    'SetCol 28 15',
    'QueryCol 73',
    'SetCol 155 31',
    'SetRow 97 18',
    'QueryRow 174',
    'SetRow 78 21',
    'QueryCol 71',
    'SetRow 247 9',
    'SetRow 240 17',
    'QueryRow 74',
    'QueryCol 234',
    'QueryRow 0',
    'SetCol 244 20',
    'QueryCol 216',
    'SetRow 95 15',
    'QueryRow 248',
    'SetRow 188 18',
    'QueryCol 123',
    'SetCol 130 24',
    'QueryCol 236',
    'SetCol 152 9',
    'QueryRow 41',
    'SetCol 121 31',
    'QueryCol 90',
    'QueryCol 155',
    'QueryRow 170',
    'SetCol 171 0',
    'QueryRow 161',
    'QueryCol 153',
    'QueryRow 185',
    'QueryCol 90',
    'SetRow 219 25',
    'SetCol 151 9',
    'SetRow 127 10',
    'SetCol 208 28',
    'SetRow 175 16',
    'QueryRow 248',
    'SetCol 69 9',
    'QueryRow 67',
    'QueryRow 117',
    'QueryCol 54',
    'QueryRow 233',
    'SetRow 226 21',
    'QueryRow 85',
    'QueryRow 135',
    'SetCol 44 10',
    'SetRow 248 5',
    'QueryCol 92',
    'QueryCol 67',
    'QueryRow 117',
    'QueryCol 54',
    'SetCol 161 0',
    'SetRow 226 9',
    'QueryCol 85',
    'SetCol 251 17',
    'QueryRow 175',
    'SetCol 152 10',
    'SetRow 92 1',
    'SetRow 67 5',
    'QueryRow 117',
    'SetRow 54 3',
    'SetCol 161 7',
    'QueryCol 226',
    'QueryRow 85',
    'QueryCol 135',
    'SetRow 175 27',
    'QueryCol 248',
    'QueryCol 92',
    'QueryRow 67',
    'SetCol 107 9',
    'QueryRow 54',
    'SetRow 233 8',
    'SetCol 100 15',
    'QueryCol 85',
    'SetCol 251 25',
    'SetRow 175 21',
    'QueryRow 226',
    'QueryRow 85',
    'QueryCol 135',
    'SetCol 152 17',
    'QueryRow 92',
    'SetRow 67 1',
    'QueryCol 117',
    'QueryRow 54',
    'SetRow 233 16'
].join('\n')

describe('queryBoard', () => {

    it('can run', () => {
        var out = lib.run(input)
        console.log('out:\n', out)
        expect(out).eql(output)
    });
});
