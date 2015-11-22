/**
 * https://www.codeeval.com/open_challenges/211/
 *
 Chardonnay or Cabernet

 Challenge Description:

 Your good friend Tom is admirer of tasting different types of fine wines.
 What he loves even more is to guess their names. One day, he was sipping very extraordinary wine.
 Tom was sure he had tasted it before, but what was its name? The taste of this wine was so familiar, so delicious,
 so pleasant… but what is it exactly? To find the answer, Tom decided to taste the wines we had. He opened wine
 bottles one by one, tasted different varieties of wines, but still could not find the right one.
 He was getting crazy, “No, it’s not that!” desperately breaking a bottle of wine and opening another one.
 Tom went off the deep end not knowing what this wine was. Everything he could say is just several letters of its name.
 You can no longer look at it and decided to help him.
 Your task is to write a program that will find the wine name, containing all letters that Tom remembers.
 Input sample:

 The first argument is a path to a file. Each line includes a test case, which contains names of wines and
 letters that Tom remembers. Names and letters are separated by a vertical bar '|'.

 You should print wine names, containing all letters that Tom remembered. Letters can be anywhere in wine names.
 If there is no name with all letters, print False.

 *
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/';

var lib = require(SRC_DIR + 'findTextInWords');
var _ = require('lodash');

var input = [
    'Cabernet Merlot Noir | ot',
    'Chardonnay Sauvignon | ann',
    'Shiraz Grenache | o'
].join('\n');

var output = [
    'Merlot',
    'Chardonnay',
    'False'
].join('\n');

describe('findTextInWords', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.run(input);
        console.log('out:\n', out);
        expect(out).eql(output);
        done();
    });
});
