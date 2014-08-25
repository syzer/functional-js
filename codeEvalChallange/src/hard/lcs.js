/**
 * Created by syzer on 8/25/2014.
 */

_ = require('lodash');

var memoizedLcs = _.memoize(lcs, function (a, b) {
    return a + ';' + b;
});

function lcs(a, b) {
    var leftSub = a.substr(0, a.length - 1);
    var rightSub = b.substr(0, b.length - 1);

    if (a.length === 0 || b.length === 0) {
        return '';
    }
    if (a.charAt(a.length - 1) === b.charAt(b.length - 1)) {
        return memoizedLcs(leftSub, rightSub) + a.charAt(a.length - 1);
    } else {
        var left = memoizedLcs(a, rightSub);
        var right = memoizedLcs(leftSub, b);

        // longest shortest
        return (left.length > right.length) ? left : right;
    }
}

function lcs2(line, i) {
    var data = line.split(';');
//    return memoizedLcs(data[0], data[1]);
//    return lcs(data[0], data[1]);

    return lcs(data[0], data[1]);
}

function run(input) {
    return readLines(input, lcs2);
}

function readLines(input, lineCallback) {
    return _.map(input.split('\n'), function (line, i) {
        if ('' === line) {
            return;
        }
        return lineCallback(line, i);
    }).join('\n');
}

module.exports.run = run;
