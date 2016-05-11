/**
 * https://www.codeeval.com/open_challenges/235/
 *
 * Simple or trump

 Challenge Description:

 First playing cards were invented in Eastern Asia and then spread all
 over the world taking different forms and appearance. In India, playing
 cards were round, and they were called Ganjifa. In medieval Japan, there
 was a popular Uta-garuta game, in which shell mussels were used instead
 of playing cards.
 In our game, we use playing cards that are more familiar nowadays.
 The rules are also simple: an ace beats a deuce (2) unless it is a trump
 deuce.
 Input sample:

 The first argument is a path to a file. Each line includes a test
 case which contains two playing cards and a trump suit. Cards and a trump
 suite are separated by a pipeline (|). The card deck includes thirteen
 ranks (from a deuce to an ace) of each of the four suits:
 clubs (♣), diamonds (♦), hearts (♥), and spades (♠).
 There are no Jokers.

 *
 */
const expect = require('chai').expect
const SRC_DIR = './../../src/easy/'

const lib = require(`${SRC_DIR}cardsHigher`)
const _ = require('lodash')

const input = [
    'AD 2H | H',
    'KD KH | C',
    'JH 10S | C'
].join('\n')

const output = [
    '2H',
    'KD KH',
    'JH'
].join('\n')

describe('cardsHigher', () => {

    it('can run', () => {
        const out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
    })

})
