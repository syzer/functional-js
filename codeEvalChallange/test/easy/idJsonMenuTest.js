/*
 JSON menu IDs

 Challenge Description:

 You have JSON string which describes a menu. Calculate the SUM of IDs of all "items" in the case a "label" exists for an item.
 Input sample:

 Your program should accept as its first argument a path to a filename. Input example is the following

 {"menu": {"header": "menu", "items": [{"id": 27}, {"id": 0, "label": "Label 0"},
 null, {"id": 93}, {"id": 85}, {"id": 54}, null, {"id": 46, "label": "Label 46"}]}}

 {"menu": {"header": "menu", "items": [{"id": 81}]}}

 {"menu": {"header": "menu", "items": [{"id": 70, "label": "Label 70"},
 {"id": 85, "label": "Label 85"}, {"id": 93, "label": "Label 93"}, {"id": 2}]}}

 All IDs are integers between 0 and 100. It can be 10 items maximum for a menu.
 Output sample:

 Print results in the following way.

 46
 0
 248


 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/easy/'; // run on over the test

var lib = require(SRC_DIR + 'idJsonMenu');
var _ = require('lodash');

var input = [
    '{"menu": {"header": "menu", "items": [{"id": 27}, {"id": 0, "label": "Label 0"}, null, {"id": 93}, {"id": 85}, {"id": 54}, null, {"id": 46, "label": "Label 46"}]}}',
    '{"menu": {"header": "menu", "items": [{"id": 81}]}}',
    '{"menu": {"header": "menu", "items": [{"id": 70, "label": "Label 70"}, {"id": 85, "label": "Label 85"}, {"id": 93, "label": "Label 93"}, {"id": 2}]}}'
].join('\n');

var output = [
    '46',
    '0',
    '248'
].join('\n');


describe('idJsonMenu', function () {

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
