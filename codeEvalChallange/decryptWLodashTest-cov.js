
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }

  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('codeEvalChallange/decryptWLodashTest.js', [4,5,7,8,9,10,11,23,24,27,51,25,28,32,46,29,30,33,43,44,47,48,52,53,56,57,60,65,54,58,61,62,63,66,70,71], {}, ["/**"," * Created by syzer on 8/4/2014."," */","var expect = require('chai').expect;","var lib = require('./decryptWLodash');","","var input = '5 | s | 92 112 109 40 118 109 109 108 123 40 119 110 40 124 112 109 40 117 105 118 129 40 119 125 124 127 109 113 111 112 40 124 112 109 40 118 109 109 108 123 40 119 110 40 124 112 109 40 110 109 127 54 40 53 40 91 120 119 107 115';","var output = 'The needs of the many outweigh the needs of the few. - Spock';","var output2 = 'The function called per element or the number of elements to return. If a property name or object';","var input2 = lib.encode(output2);","var hemingway = \"She won't die [in childbirth]. She's just having a bad time. The initial labor is usually protracted. She's only having a bad time. Afterward we'd say what a bad time and Catherine would say it wasn't really so bad. But what if she should die? She can't die. Yes, but what if she should die? She can't, I tell you. Don't be a fool. It's just a bad time. It's just nature giving her hell. It's only the first labor, which is almost always protracted. Yes, but what if she should die? She can't die. Why would she die? What reason is there for her to die? There's a just a child that has to be born, the by-product of good nights in Milan. It makes trouble and is born and then you look after it and get fond of it maybe. But what if she should die? She won't. She's all right. But what if she should die? Hey, what about that? What if she should die?\";","","//console.log(mostPopularChars(output, true));","//[ [ ' ', 12 ],","//    [ 'e', 10 ],","//    [ 'h', 5 ],","//    [ 'o', 4 ],","//    [ 't', 4 ],","//    [ 'f', 3 ],","//    [ 'n', 3 ] ]","//console.log(mostPopularChars(hemingway, true));","","describe('decrypt Test', function () {","    afterEach(function (done) {","        setTimeout(done, 10);","    });","    describe('Decode Spock', function () {","        it('should decode his saying', function (done) {","            expect(lib.decode(input)).to.eql(output);","            done();","        });","        it('should find histogram of his speech', function () {","            var expected = [","                [ ' ', 12 ],","                [ 'E', 10 ],","                [ 'H', 5 ],","                [ 'T', 5 ],","                [ 'O', 4 ],","                [ 'F', 3 ],","                [ 'N', 3 ],","                [ 'S', 3 ]","            ];","            var histogramOfSpock = lib.mostPopularChars(lib.decode(input), true);","            expect(histogramOfSpock).to.eql(expected);","        });","        it('should find space as most common character', function () {","            var histogramOfSpock = lib.mostPopularChars(lib.decode(input), true);","            expect(histogramOfSpock[0]).to.include(' ');","        });","    });","    describe('Decode Hemingway', function () {","        var encodedHemingway = lib.encode(hemingway);","        it('should able to decode/encode', function () {","            expect(lib.decode(encodedHemingway)).to.eql(hemingway);","        });","        var histogramOfHemingway = lib.mostPopularChars(hemingway, true);","        it('should find space as most common character', function () {","            expect(histogramOfHemingway[0]).to.include(' ');","        });","        it('have same histogram after encode/decode', function () {","            var mostPopularInHemingway = lib.mostPopularChars(hemingway, true);","            var decodedHemingway = lib.mostPopularChars(lib.decode(lib.encode(hemingway)), true);","            expect(mostPopularInHemingway).to.deep.equal(decodedHemingway);","        });","        it('should find histogram of his speech', function () {","            var expected = [","                [ ' ', 167 ],","                [ 'T', 67 ]","            ];","            expect(histogramOfHemingway[0]).to.eql(expected[0]);","            expect(histogramOfHemingway[1]).to.eql(expected[1]);","        });","    })","});",""]);
/**
 * Created by syzer on 8/4/2014.
 */
_$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 4);

var expect = require("chai").expect;

_$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 5);

var lib = require("./decryptWLodash");

_$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 7);

var input = "5 | s | 92 112 109 40 118 109 109 108 123 40 119 110 40 124 112 109 40 117 105 118 129 40 119 125 124 127 109 113 111 112 40 124 112 109 40 118 109 109 108 123 40 119 110 40 124 112 109 40 110 109 127 54 40 53 40 91 120 119 107 115";

_$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 8);

var output = "The needs of the many outweigh the needs of the few. - Spock";

_$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 9);

var output2 = "The function called per element or the number of elements to return. If a property name or object";

_$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 10);

var input2 = lib.encode(output2);

_$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 11);

var hemingway = "She won't die [in childbirth]. She's just having a bad time. The initial labor is usually protracted. She's only having a bad time. Afterward we'd say what a bad time and Catherine would say it wasn't really so bad. But what if she should die? She can't die. Yes, but what if she should die? She can't, I tell you. Don't be a fool. It's just a bad time. It's just nature giving her hell. It's only the first labor, which is almost always protracted. Yes, but what if she should die? She can't die. Why would she die? What reason is there for her to die? There's a just a child that has to be born, the by-product of good nights in Milan. It makes trouble and is born and then you look after it and get fond of it maybe. But what if she should die? She won't. She's all right. But what if she should die? Hey, what about that? What if she should die?";

_$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 23);

//console.log(mostPopularChars(output, true));
//[ [ ' ', 12 ],
//    [ 'e', 10 ],
//    [ 'h', 5 ],
//    [ 'o', 4 ],
//    [ 't', 4 ],
//    [ 'f', 3 ],
//    [ 'n', 3 ] ]
//console.log(mostPopularChars(hemingway, true));
describe("decrypt Test", function() {
    _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 24);
    afterEach(function(done) {
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 25);
        setTimeout(done, 10);
    });
    _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 27);
    describe("Decode Spock", function() {
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 28);
        it("should decode his saying", function(done) {
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 29);
            expect(lib.decode(input)).to.eql(output);
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 30);
            done();
        });
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 32);
        it("should find histogram of his speech", function() {
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 33);
            var expected = [ [ " ", 12 ], [ "E", 10 ], [ "H", 5 ], [ "T", 5 ], [ "O", 4 ], [ "F", 3 ], [ "N", 3 ], [ "S", 3 ] ];
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 43);
            var histogramOfSpock = lib.mostPopularChars(lib.decode(input), true);
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 44);
            expect(histogramOfSpock).to.eql(expected);
        });
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 46);
        it("should find space as most common character", function() {
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 47);
            var histogramOfSpock = lib.mostPopularChars(lib.decode(input), true);
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 48);
            expect(histogramOfSpock[0]).to.include(" ");
        });
    });
    _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 51);
    describe("Decode Hemingway", function() {
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 52);
        var encodedHemingway = lib.encode(hemingway);
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 53);
        it("should able to decode/encode", function() {
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 54);
            expect(lib.decode(encodedHemingway)).to.eql(hemingway);
        });
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 56);
        var histogramOfHemingway = lib.mostPopularChars(hemingway, true);
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 57);
        it("should find space as most common character", function() {
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 58);
            expect(histogramOfHemingway[0]).to.include(" ");
        });
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 60);
        it("have same histogram after encode/decode", function() {
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 61);
            var mostPopularInHemingway = lib.mostPopularChars(hemingway, true);
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 62);
            var decodedHemingway = lib.mostPopularChars(lib.decode(lib.encode(hemingway)), true);
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 63);
            expect(mostPopularInHemingway).to.deep.equal(decodedHemingway);
        });
        _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 65);
        it("should find histogram of his speech", function() {
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 66);
            var expected = [ [ " ", 167 ], [ "T", 67 ] ];
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 70);
            expect(histogramOfHemingway[0]).to.eql(expected[0]);
            _$jscmd("codeEvalChallange/decryptWLodashTest.js", "line", 71);
            expect(histogramOfHemingway[1]).to.eql(expected[1]);
        });
    });
});