/**
 * Created by syzer on 9/2/2014.
 */
"use strict";
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// count occurrences of words
function tokenize(str) {
    var tokenized = {};
    str.split(' ').forEach(function (el) {
        tokenized[el] = tokenized[el] + 1 || 1;
    });
    return tokenized;
}

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

/**
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
 */

var str2 = "Mary had a little lamb its fleece was white as snow And everywhere that Mary went the lamb was sure to go It followed her to school one day which was against the rule It made the children laugh and play to see a lamb at school And so the teacher turned it out but still it lingered near And waited patiently about till Mary did appear Why does the lamb love Mary so the eager children cry Why Mary loves the lamb you know the teacher did reply";

// TODO fix first tokken
function nGramText2(str, n) {
    n = n || 2;
    var out = [];

    str.split(' ').forEach(function (curr, i, arr) {
        console.log(i, curr, i < n - 2 || i > arr.length - n);
        if (i < n - 2 || i > arr.length - n) {
            return;
        }
        var gram = arr.slice(i - 1, i + n - 2).join(' ');
        var word = arr[i + n - 2];
        out[gram] = out[gram] || {};
        out[gram][word] = out[gram][word] + 1 || 1;
    });

    return out;
}

//var nGramText = _.memoize(nGramText2);
var nGramText = _.memoize(function(n) {
    return nGramText2(str2, n);
});

// todo _.forIn
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
    var needle = nGramText(nGramLevel)[word];
    //var needle = nGramText2(str2, nGramLevel)[word];

    if (!needle) {
        throw new Error('0 ' + word + ' ' + nGramLevel);
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
module.exports.nGramText2 = nGramText2;
module.exports.stripNonAlpha = stripNonAlpha;
module.exports.text = text;
module.exports.str = str2;
