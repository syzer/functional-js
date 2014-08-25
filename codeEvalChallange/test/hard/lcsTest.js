/**
 * Created by syzer on 8/4/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'lcs');
var _ = require('lodash');

var input =
    'XMJYAUZ;MZJAWXU\n' +
    'ALAMAKOTA;MA\n' +
    'hello world mordor;d mordo\n' +
    'hello world mordors;d mordorr\n' +
    'the quick brown fox;the fast brown dogs\n';

var output =
    'MJAU\n' +
    'MA\n' +
    'd mordo\n' +
    'd mordor\n' +
    'the  brown o\n';

var input2 =
    'VKZANPRJBNRRIHG;LIVIJWRMIKOHZ\n' +
    'WHCYEPLQKOZHFB;SZKHWPTXHDGLEEVIICEX\n' +
    'SZKHMBBKBIOJISL;HYHAVXVFWOXS\n' +
    'WPMFIEKVVKDANIU;MUOYQJGDBYBDTQN\n' +
    'YRZFFJQKLDHPR;IKLWYSFJGFBYGJ\n' +
    'GVIRWVQQGMQZHMZXTZKOO;RALULSQEADBACRN\n' +
    'TRRNGDDWHWEU;PIHOTYKGEYQGOESCVC\n' +
    'CGEWPFRNODITRTTMDAIJY;BYDTFZQWRPXSHUTLT\n' +
    'SODTNLWVWMNODP;IFVGCRRWQXZQLFQ\n' +
    'WXTMYCAOZRTPE;BTYAXOBMHA\n' +
    'UUZTCDGREQRKDLSV;JXFNVPSVBAYRO\n' +
    'DYRRLYTNZWO;RQXTWOXHQAFPOJDDT\n' +
    'OWGSOVIQSCQMDFFDPIQ;RCUHEODGVdeddeeZGZRKFZZJKFJJ\n' +
    'thisisatest;testing123testing\n' +
    'AZVOCXTEFHAHQHOACCTFBS;ANJUAGGHQW\n' +
    'PZMJXNNXIO;LRSCGIYFZDNTN\n' +
    'PWFRMRUYSFOXCNWPVQYL;WQIUYBEJMS\n' +
    'the quick brown fox;the fast brown dogs\n' +
    'hello world mordor;lord of the rings\n';

var output2 =
    '';


describe('lcs', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can get every other number in stack', function (done) {
//        console.log(lib.run(input));
        expect(lib.run(input)).eql(output);
//        console.log(lib.run(input2));
        done();
    });
});
