/**
 * Created by syzer on 8/23/2014.
 */

_ = require('lodash');

function toNumbers(array) {
    return _(array).map(function (el) {
        return _.parseInt(el);
    }).value();
}

//TODO ugly rewrite
function reverse(line, i) {
    var data = line.split(';');
    var array = toNumbers(data[0].split(','));
    var noElInGroup = toNumbers(data[1])[0];
    var buffer = [];
    var output = [];

    array.forEach(function (el, j) {
        if (j > array.length - (array.length % noElInGroup)) {
//            console.log('pushing ' + el);
            buffer.push(el);
        } else {
            buffer.unshift(el);
        }
        if (j % noElInGroup === noElInGroup - 1) {
            output = output.concat(buffer);
            buffer = [];
        }

        // end
        if (j === array.length - 1) {
            output = output.concat(buffer);
        }
    });

    return output;
}

function run(input) {
    return readLines(input, reverse);
}

function readLines(input, lineCallback) {
    return _.map(input.split('\n'), function (line, i) {
        if ('' === line) {
            return;
        }
        return lineCallback(line, i);
    }).join('\n');
}

module.exports.reverse = reverse;
module.exports.run = run;
