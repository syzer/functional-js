/**
 * Created by syzer on 9/2/2014.
 */
"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

var text = ['Mary had a little lamb its fleece was white as snow;',
    ' And everywhere that Mary went, the lamb was sure to go.',
    ' It followed her to school one day, which was against the rule;',
    ' It made the children laugh and play, to see a lamb at school.',
    ' And so the teacher turned it out, but still it lingered near,',
    ' And waited patiently about till Mary did appear.',
    ' "Why does the lamb love Mary so?" the eager children cry;',
    ' "Why, Mary loves the lamb, you know" the teacher did reply."'
].join('');

function stripNonAlpha(str) {
    return str.replace(/[^\w\s]+/gi, '');
    //.toLowerCase()
}


//var str = "mary had a little lamb its fleece was white as snow and everywhere that mary went the lamb was sure to go it followed her to school one day which was against the rule it made the children laugh and play to see a lamb at school and so the teacher turned it out but still it lingered near and waited patiently about till mary did appear why does the lamb love mary so the eager children cry why mary loves the lamb you know the teacher did reply";
var str2 = "Mary had a little lamb its fleece was white as snow And everywhere that Mary went the lamb was sure to go It followed her to school one day which was against the rule It made the children laugh and play to see a lamb at school And so the teacher turned it out but still it lingered near And waited patiently about till Mary did appear Why does the lamb love Mary so the eager children cry Why Mary loves the lamb you know the teacher did reply";

var nGramed = {
    Mary: {had: 1, went: 1, did: 1, so: 1, loves: 1},
    had: {a: 1},
    a: {little: 1, lamb: 1},
    little: {lamb: 1},
    lamb: {its: 1, was: 1, at: 1, love: 1, you: 1},
    its: {fleece: 1},
    fleece: {was: 1},
    was: {white: 1, sure: 1, against: 1},
    white: {as: 1},
    as: {snow: 1},
    snow: {And: 1},
    And: {everywhere: 1, so: 1, waited: 1},
    everywhere: {that: 1},
    that: {Mary: 1},
    went: {the: 1},
    the: {lamb: 3, rule: 1, children: 1, teacher: 2, eager: 1},
    sure: {to: 1},
    to: {go: 1, school: 1, see: 1},
    go: {It: 1},
    It: {followed: 1, made: 1},
    followed: {her: 1},
    her: {to: 1},
    school: {one: 1, And: 1},
    one: {day: 1},
    day: {which: 1},
    which: {was: 1},
    against: {the: 1},
    rule: {It: 1},
    made: {the: 1},
    children: {laugh: 1, cry: 1},
    laugh: {and: 1},
    and: {play: 1},
    play: {to: 1},
    see: {a: 1},
    at: {school: 1},
    so: {the: 2},
    teacher: {turned: 1, did: 1},
    turned: {it: 1},
    it: {out: 1, lingered: 1},
    out: {but: 1},
    but: {still: 1},
    still: {it: 1},
    lingered: {near: 1},
    near: {And: 1},
    waited: {patiently: 1},
    patiently: {about: 1},
    about: {till: 1},
    till: {Mary: 1},
    did: {appear: 1, reply: 1},
    appear: {Why: 1},
    Why: {does: 1, Mary: 1},
    does: {the: 1},
    love: {Mary: 1},
    eager: {children: 1},
    cry: {Why: 1},
    loves: {the: 1},
    you: {know: 1},
    know: {the: 1}
};

// warning unsorted!
function nGramText(str) {
    var out = [];

    str.split(' ').reduce(function (last, word) {
        out[last] = out[last] || {};
        out[last][word] = out[last][word] + 1 || 1;

        return word;
    });

    return out;
}

function tokenize(str) {
    var tokenized = {};
    str.split(' ').forEach(function (el) {
        tokenized[el] = tokenized[el] + 1 || 1;
    });
    return tokenized;
}

function objToSortedArray(sortedObject) {
    var result = [];
    var keys = _.keys(sortedObject);
    _.forEach(keys, function (key) {
        result.push(sortedObject[key]);
    });
    return result;
}

function objToSortedArr(obj) {
    var sortable = [];

    for (var vehicle in obj) {
        sortable.push([vehicle, obj[vehicle]])
    }

    // sort by values and if same sort by keys
    sortable.sort(function (a, b) {
        return b[1] - a[1] || a[0] > b[0]
    });
    return sortable;
}

function predict(nGramLevel, word) {
    var needle = nGramed[word];

    if (!needle) {
        throw new Error('0 ' + word + nGramLevel);
    }

    var total = _.reduce(needle, function (acc, el) {
        return acc + el;
    });

    needle = objToSortedArr(needle);

    return _(needle)
        .map(function (el) {
            el[1] = (el[1] / total).toFixed(3);
            return el;
        })
        .map(function (el) {
            return el.join(',');
        })
        .value()
        .join(';');
}

function prepare(line) {
    var data = line.split(',');
    data[0] = parseInt(data[0], 10);
    return predict(data[0], data[1]);
}

function run(input) {
    return readLines(input, prepare);
}

function runAll(input) {
    return prepare(input);
}

function readLines(input, lineCallback) {
    return input
        .split('\n')
        .map(function (line, i) {
            if ('' === line) {
                return;
            }
            return lineCallback(line, i);
        })
        .join('\n');
}

module.exports.run = run;
module.exports.runAll = runAll;
module.exports.nGramText = nGramText;
module.exports.stripNonAlpha = stripNonAlpha;
module.exports.text = text;
module.exports.str = str2;
