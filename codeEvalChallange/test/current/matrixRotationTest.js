/**
 * https://www.codeeval.com/open_challenges/178/
 *
 * Matrix Rotation

 Challenge Description:

 You are given a 2D N×N matrix. Each element of the matrix is a letter: from ‘a’ to ‘z’. Your task is to rotate the matrix 90° clockwise:

 a b c        g d a
 d e f  =>    h e b
 g h i        i f c
 *
 */
const expect = require('chai').expect
const SRC_DIR = './../../src/easy/'

const lib = require(`${SRC_DIR}matrixRotation`)
const _ = require('lodash')

const input = [
    'a b c d',
    'a b c d e f g h i j k l m n o p',
    'a b c d e f g h i'
].join('\n')

const output = [
    'c a d b',
    'm i e a n j f b o k g c p l h d',
    'g d a h e b i f c'
].join('\n')

describe('matrixRotation', () => {

    it('can run', () => {
        const out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
    })

})
