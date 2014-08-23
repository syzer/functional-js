/**
 * Created by syzer on 8/22/2014.
 */
var _ = require('lodash');

function toNumbers(array) {
    return _(array).map(function (el) {
        return _.parseInt(el);
    }).value();
}
//TODO curried!!
var arrConcatCurried = _.curry(arrConcat);
var test = _.compose(/*arrConcatCurried,*/ getOnlyDifferent, toNumbers);

//maybe words.lenght
//+ findMissingHint :: array -> array
function findMissingHint(hints, words) {
    words = words || hints;
    hints = toNumbers(hints);
    return hints.concat(_.filter(_.range(1, words.length), function (num) {
        return !_.contains(hints, num);
    }));
}

function oneToRange(array) {
    return _.range(1, array.length);
}

function arrConcat(array, concat) {
    return array.concat(concat);
}

function findMissingWithCompose(hints) {
    return hints.concat(test(hints));
//    arrConcatCurried(_.clone(hints));
//    return test(hints);
}

function getOnlyDifferent(array) {
    //_.range(1, array.length)
    return _.filter(oneToRange(array), function (num) {
        return !_.contains(array, num);
    });
}

function decode(input) {
    return _.map(input.split('\n'), function (line, i) {
        var words, data, hints;

        if (line === '') {
            return;
        }
        data = line.split(';');
        words = data[0].split(' ');
        hints = data[1].split(' ');

        if (words.length !== hints.lenght) {
            hints = findMissingHint(hints, words);
        }

        return _(words).sortBy(function (el, j) {
            return hints[j];
        }).join(' ');
    }).join('\n');
}

module.exports.decode = decode;
module.exports.findMissingHint = findMissingHint;
module.exports.findMissingWithCompose = findMissingWithCompose;
