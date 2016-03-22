/**
 * https://www.codeeval.com/open_challenges/237/
 *
 Panacea - truth or lie

 Challenge Description:

 There are many computer and human viruses nowadays. Scientists are scratching their heads
 over antiviruses that could stop a particular virus and, in most cases, they find right solutions.
 So, virologists need to know which antiviruses can protect us from viruses, and what
 they still have to work on to secure against the remaining viruses. Let’s help them out!
 Input sample:

 The first argument is a path to a file. Each line includes a test case with virus
 components in the hexadecimal numeral system (HEX) and antivirus components in the
 binary number system (BIN). Virus and antivirus components are separated by a pipeline '|'.
 Output sample:

 Your task is to calculate the sum of all virus components and compare it with the sum of
 antivirus components. If the numbers are the same or the sum of antivirus components is
 greater than the sum of virus components, this means that the virus was stopped.
 So, print True. Otherwise, print False.
 Constraints:

 The sum of components can be from 60 to 1500.
 The number of components in virus and antivirus can be from 1 to 8.
 The number of test cases is 40.

 *
 */
const expect = require('chai').expect;
const SRC_DIR = './../../src/easy/';

const lib = require(SRC_DIR + 'panaceaHexToNum')
const _ = require('lodash')

var input = [
    '64 6e 78 | 100101100 11110',
    '5e 7d 59 | 1101100 10010101 1100111',
    '93 75 | 1000111 1011010 1100010'
].join('\n')

const fullInput = [
    ['93 75 ', ' 1000111 1011010 1100010'],
    ['88 51 ', ' 1001100 1001010 1001100 111111 1101000 1110001'],
    ['55 7d 6f 48 85 54 82 ', ' 1010000 10010100 1110011 1110100 10001111 1010111 1101010'],
    ['6d 8a ', ' 1110010 1100010 1101001'],
    ['64 6e 78 ', ' 100101100 11110'],
    ['73 46 55 ', ' 1001101 1000111 1101101 1110011 1100101 10000000'],
    ['96 40 64 88 49 41 73 88 ', ' 10010011 1000011 1111100 1010100'],
    ['80 96 59 6e 7b 8e 63 96 ', ' 10000010 1110111 1010011 1111101 1101111 111110 1001101 1110100'],
    ['52 76 7b 73 ', ' 1111110 10010110 1001001 1110101 1111011 1001101 1001110 1110101'],
    ['83 54 59 ', ' 111101 10001110 10000101 10010110 1100010'],
    ['5d 4d 8b ', ' 10000010 1000010 1010011 1001100 1000111'],
    ['66 76 52 ', ' 1001111 1001110 1000100 10001111 1101011'],
    ['86 7b 90 ', ' 1111000 10010010'],
    ['49 93 91 7d 40 45 43 61 ', ' 1001011 1110100 10001011 1000110 1011100 1111111 10001010 1111001'],
    ['4b 82 80 ', ' 1100101 1110000 1000101 1111000 10001010 1100011 10010110'],
    ['5e 7d 59 ', ' 1101100 10010101 1100111'],
    ['40 54 44 75 ', ' 10001010 10010001 1100111 1111001 1010111'],
    ['63 92 7b 6c 94 7d 88 95 ', ' 1000000 1101110 1111010 1001001 10000001 1101110'],
    ['60 60 83 58 8a ', ' 1110010 1111000 1101111'],
    ['42 8a 54 92 85 76 44 ', ' 10010100 1110010 10001111'],
    ['82 68 3e 4f ', ' 1111111 10010101 1101011 10001011 1011001 10001111 1011100'],
    ['4d ', ' 1010100 1100110 1000000 1000101'],
    ['56 ', ' 1100011 1100100 10001100 1010110'],
    ['3d 88 6c 6e 96 ', ' 1001111 10001010 1011011 1111101 10001111'],
    ['47 44 82 ', ' 1000111 1010100 10001110 1111110 10000110 1100001'],
    ['50 82 ', ' 10001101 1110110 111101'],
    ['5f 82 77 84 4d 8f 75 83 ', ' 1101001 1110010 1000110'],
    ['59 8b 88 58 84 ', ' 111111'],
    ['65 59 ', ' 1101000 10000001 10010000 1101100'],
    ['87 ', ' 1000000 10000000 10001100 1100110 1111000 1101110 1010001'],
    ['5b 62 62 7f 76 ', ' 10010110 1010110 10010010 1111011 10000011 1101100 1101110 1000011'],
    ['92 77 57 74 74 4f ', ' 10010010 10000111 1000000'],
    ['78 3e 6d 8d 84 ', ' 1110000 1011000 1111101 1101000 1100000 1010001 1000000'],
    ['7a 8e 43 52 6a 85 64 ', ' 10010100 10001110 1011010 1101110 1111000 1110010'],
    ['74 82 92 6d ', ' 10001000 1011100'],
    ['4d 63 60 78 ', ' 1100000 10010101 111111 1011101 1111110'],
    ['80 8e 5b 3d 6f 89 6f 87 ', ' 10000000 1011011 1000011 1110100 1110010 1101110 10001110'],
    ['6e ', ' 1100001 1010101 1000100 1110000 1001110 1011110 1001100'],
    ['71 66 74 42 93 51 6c ', ' 10001110 1010110 1010000'],
    ['5c 6b 56 8d ', ' 1010011']
]
    .join('|')
    //.join('\n')

var output = [
    'True',
    'True',
    'False'
].join('\n');

describe('panaceaHexToNumber', () => {

    it('can run', () => {
        var out = lib.run(input)
        console.log('out:\n', out)
        expect(out).eql(output)
    });
});
