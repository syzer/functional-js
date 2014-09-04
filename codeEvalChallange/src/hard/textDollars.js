/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function fuckedUpSpeechRepair(string) {
    var mapping = {
        'TenOne': 'Eleven',
        'TenTwo': 'Twelve',
        'TenThree': 'Thirteen',
        'TenFour': 'Fourteen',
        'TenFive': 'Fifteen',
        'TenSix': 'Sixteen',
        'TenSeven': 'Seventeen',
        'TenEight': 'Eighteen',
        'TenNine': 'Nineteen'
    };
    _(mapping).forEach(function (to, from) {
        if (string.indexOf(from) !== -1) {
            string = string.replace(from, to);
        }
    });
    return string;
}

function digitToString(digit) {
    var mappings = {
        1: 'One',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Six',
        7: 'Seven',
        8: 'Eight',
        9: 'Nine',
        0: ''
    };
    return mappings[digit];
}

function tensDigitToString(tensDigit) {
    var mappings = {
        1: 'Ten',
        2: 'Twenty',
        3: 'Thirty',
        4: 'Forty',
        5: 'Fifty',
        6: 'Sixty',
        7: 'Seventy',
        8: 'Eighty',
        9: 'Ninety',
        0: ''
    };
    return mappings[tensDigit];
}

function digitPositionToString(digit) {
    var mapping = {
        0: 'Dollars',   //vs Dollar
        1: '',
        2: 'Hundred',
        3: 'Thousand',
        4: '',
        5: 'Hundred',
        6: 'Million', // Thousands
        7: '',
        8: 'Hundred',
        9: 'Billion'
    };
    return mapping[digit];
}

function mapGroupBy3ToString(group, i) {
    var mapping = {
        1: 'Thousand',
        2: 'Million',
        3: 'Billion'
    };
    group.unshift(mapping[i]);
    return group;
}

// TODO to boolean
// on 1, and 4th positions are decimals
function getTensMultiplier(j) {
    return j == 1 || j == 4 || j == 7 ? tensDigitToString : digitToString;
}

function textDollars(numberString, i) {
    var length = numberString.length;

    return _(numberString)
        .reduceRight(function (sum, digit, i) {
            var j = length - i - 1;
            if (getTensMultiplier(j)(digit)) {
                return getTensMultiplier(j)(digit) + digitPositionToString(j) + sum;
            }
            if ('0' === digit && j !== 0 && j !== 3 && j !== 9) {
                return sum;
            }
            return digitPositionToString(j) + sum;
        }
        , '');
}

//TODO lib
function reverseString(s) {
    return s.split('').reverse().join('');
}

//todo by any element
function groupByEl(array, el) {
    var groupBy3 = [];
    var group = [];
    array.forEach(function (num, i) {
        group.push(num);
        if (i % 3 === 2 || i === array.length - 1) {
            groupBy3.push(_.clone(group));
            group = [];
        }
    });
    return groupBy3;
}

function isAnyNonZero(arrayStrings) {
    return _.some(arrayStrings, function (el) {
        if (el !== '0') {
            return true;
        }
    })
}

//array <3 digits
function mapDigitsToStrings(array) {
    return array.map(function (el, i) {
        if (i == 1) {
            return tensDigitToString(el);
        }
        if (i === 2) {
            return digitToString(el) ? digitToString(el) + 'Hundred' : '';
        }
        return digitToString(el);
    })
}

//TODO compose
function modifiedString(string) {
    return fuckedUpSpeechRepair(textDollars2(string));
}

function textDollars2(string) {
    string = reverseString(string).split('');
    return _(groupByEl(string, 3))
        .chain()
        .reduce(function (acc, group, i) {
            if (isAnyNonZero(group)) {
                group = mapDigitsToStrings(group);
                group = mapGroupBy3ToString(group, i);
                acc.push(group);
                return acc;
            }
            return acc;
        }, ['Dollars'])
        .flatten()
        .compact()
        .reverse()
        .value()
        .join('');
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

function run(input) {
    return readLines(input, modifiedString);
}

module.exports.run = run;
module.exports.digitToString = digitToString;
module.exports.tensDigitToString = tensDigitToString;
module.exports.digitPositionToString = digitPositionToString;
module.exports.textDollars2 = textDollars2;
module.exports.isAnyNonZero = isAnyNonZero;
