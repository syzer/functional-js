/**
 * Created by syzer on 8/23/2014.
 */

_ = require('lodash');

function toNumber(num) {
    return _.parseInt(num);
}

//TODO ugly rewrite
function mthToLast(line, i) {
    line = line.split(' ');
    var nth = toNumber(line.pop());


    if (nth > line.length) {
        return;
    }

    // cyclical
//    if (nth > line.length) {
//       nth %= line.length;
//    }

//    if (nth === 0 ) {
//        return _.first(line);
//    }
    return _.first(_.last(line, nth));
}

function run(input) {
    return readLines(input, mthToLast);
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
