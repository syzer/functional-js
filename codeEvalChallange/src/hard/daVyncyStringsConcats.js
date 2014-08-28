/**
 * Created by syzer on 8/26/2014.
 */

var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


var dictionary = [];

//"World", "Web", "Brave New World" => 'Brave New Web'
function replaceString(oldS, newS, fullS) {
    return fullS.split(oldS).join(newS);
}

function sharedStart(array) {
    var A = array.slice(0).sort(),
        word1 = A[0], word2 = A[A.length - 1],
        L = word1.length, i = 0;
    while (i < L && word1.charAt(i) === word2.charAt(i)) i++;

    return word1.substring(0, i);
}

// i, j are the ovvelaping ones
function sharedSuffixMiddle(str1, str2) {
    var i = 2;
    var L = str1.length;
    while (i < L && str2.indexOf(str1.substr(str1.length - i - 1, i)) !== -1) i++;

    var j = 2;
    var K = str2.length;
    // same with reversed strings
    while (j < K && str1.indexOf(str2.substr(str2.length - j - 1, j)) !== -1) j++;

//    console.log(
//        'here:',
//        str1.substr(str1.length - i, i), '<-!:',
//        str2.substr(str2.length - j, j), '?:',
//        str2.substr(str2.indexOf(str1.substr(str1.length - i, i)) + i)
//    );

    // or return from here
    if (j > i) {
        return sharedSuffixMiddle(str2, str1);
    }


    return [
        i,
        // whole 1st + midle to end of 2nd
            str1 + str2.substr(str2.indexOf(str1.substr(str1.length - i, i))+ i)
    ];
}

// when shares middle of string with next prefix
function sharedMiddlePrefix(str1, str2) {
    var i = 2;
    var L = str2.length;
    while (i < L && str1.indexOf(str2.substring(0, i)) !== -1) {    //
        i++;
    }

    // if string from other end has better match
    var j = 2;
    var K = str1.length;
    while (j < K && str2.indexOf(str1.substring(0, j)) !== -1) {    //
        j++;
    }

    // check suffix of 1 and middle of 2nd
    var k = sharedSuffixMiddle(str1, str2);
    if (k[0] >= _.max([i, j])) {
        return k;
    }
    if (i === j === 2) {
//        return sharedSuffixMiddle(str1, str2);
        console.log('\ni was cheated');
    }

    //TODO maybe return from here
    if (j > i) {
        return sharedMiddlePrefix(str2, str1);
    }

    // they said that this case will not happen
    // maybe check if they are same (up to j) ??
    if (i === j) {
        return [
            i,
                str1.length >= str2.length ? str1 : str2
        ];
    }

    return [
        i,
            str1.substring(0, str1.indexOf(str2.substring(0, i - 1))) + str2
    ];
}

//TODO reducer
function thereCanBeOnlyOne(list) {

    if (list.length === 1) {
        return list[0];
    }

    list = _(list).sortBy(function (el) {
        return -el.length
    }).value();
//    if (list.length < 5) {
//        console.log(list);
//    }
//    console.log(list);

    var prefix = list.pop();
//    var prefix = list.shift();    // shilt when smallest first
    var bestMatch = _(list)
        .map(function (word, i) {
            var modified = sharedMiddlePrefix(word, prefix);
            modified[2] = i;        // save witch to modify
            return modified;
        })
        .max(function (el) {
            return el[0];
        })
//        .tap(console.log)
        .value();

    list[bestMatch[2]] = bestMatch[1];

    return thereCanBeOnlyOne(list);
}

function daVyncy(line, i) {
    var list = line.split(';');
    //TODO check for new lines

    return thereCanBeOnlyOne(list);
}

function run(input) {
    return readLines(input, daVyncy);
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
module.exports.sharedStart = sharedStart;
module.exports.sharedMiddlePrefix = sharedMiddlePrefix;
module.exports.sharedSuffixMiddle = sharedSuffixMiddle;

