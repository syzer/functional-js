/**
 * Created by syzer on 8/26/2014.
 */

var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


var dictionary = [];

function findOverlaping(str1, str2, i, fromLeft) {
    fromLeft = fromLeft || true;
    i = i || 0;

    if (i === str1.length || i === str2.length) {
        if (fromLeft) {
            return [str1.substring(0, i), true];
        }
        if (!fromLeft) {
            return [str2.substring(0, i), false];
        }
        return;
    }

    if (str1.charAt(i) === str2.charAt(str2.length - i - 1)) {
        // fron end
        return findOverlaping(str1, str2, i + 1, true);
    }

    if (str2.charAt(i) === str1.charAt(str1.length - i -1)) {
        return findOverlaping(str1, str2, i+1 , false);
    }

    return str1;
}


function daVyncy(line, i) {
//    findLine(dictionary, line);
    //find overlapingWIthDIctionary(dictionary)
    //find max
    // if not in dictionary
    // add to dictionary
    // if in maxx of dictionry merge

    // newlines

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
    }).join(';');
}

module.exports.run = run;
module.exports.findOverlaping = findOverlaping;

