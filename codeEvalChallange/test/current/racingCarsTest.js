/**
 * https://www.codeeval.com/open_challenges/136/submit/
 * Racing Chars

 Challenge Description:
 You are given a file where each line is a section of a race track with obstructions, gates, and checkpoints. Your task is to find a way to pass this track using the following information:

 1. Each section contains either one single gate or one gate with a checkpoint.
 2. You should drive only through gates or checkpoints.
 3. You should drive through a checkpoint rather than a gate.
 4. An obstruction is represented by a number sign "#".
 5. A gate is represented by an underscore "_".
 6. A checkpoint is represented by a letter C.

 Input sample:

 Your program should accept a path to a filename as its first argument. Each line of the file is a new section of a race track.
 Output sample:

 Print out the way of passing this race track starting from the first line in the file. Use a pipe "|" for the straight, use a slash "/" for the left turn, and use a backslash "\" for the right turn.
 Constraints:

 The number of lines in a file is 50.
 The width of a section is 12 characters
 *
 */
const expect = require('chai').expect;
const SRC_DIR = './../../src/easy/';

const lib = require(SRC_DIR + 'racingChars')
const _ = require('lodash')

const input = [
    '#########_##',
    '########C_##',
    '#######_####',
    '######_#C###',
    '#######_C###',
    '#######_####',
    '######C#_###',
    '######C_####',
    '#######_####',
    '#######_####'
].join('\n')

const output = [
    '#########|##',
    '#######/####',
    `######_#\###`,
    '#######_|###',
    '#######/####',
    '######/#_###',
    '########/_##',
    '######|_####',
    '#######\####',
    '#######|####'
].join('\n')

describe('racingChars', () => {

    it('can run', () => {
        var out = lib.run(input)
        console.log('out:\n', out)
        expect(out).eql(output)
    });
});
