/**
 * https://www.codeeval.com/open_challenges/166/
 *
 * Delta Time

 Challenge Description:

 You are given the pairs of time values. The values are in the HH:MM:SS format with leading zeros. Your task is to find out the time difference between the pairs.
 Input sample:

 The first argument is a file that contains lines with the time pairs.

 For example:
 Output sample:

 Print to stdout the time difference for each pair, one per line.
 You must format the time values in HH:MM:SS with leading zeros.

 *
 */
var expect = require('chai').expect
var SRC_DIR = './../../src/easy/'

var lib = require(`${SRC_DIR}dateTimeDiff`)
var _ = require('lodash')

var input = [
    '14:01:57 12:47:11',
    '13:09:42 22:16:15',
    '08:08:06 08:38:28',
    '23:35:07 02:49:59',
    '14:31:45 14:46:56'
].join('\n')

var output = [
    '01:14:46',
    '09:06:33',
    '00:30:22',
    '20:45:08',
    '00:15:11'
].join('\n')

describe('dateTimeDiff', () => {

    it('can run', () => {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
    })

})
