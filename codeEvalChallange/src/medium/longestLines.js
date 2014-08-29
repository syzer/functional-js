/**
 * Created by syzer on 8/29/2014.
 */
/**
 * Created by syzer on 8/26/2014.
 */

var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function run(input) {
    return readLines(input);
}

function readLines(input, lineCallback) {
    var lines = input.split('\n');
    var maxElements = parseInt(lines.shift());
    return _(lines)
        .sortBy(function (line) {
            return -line.length;
        })
        .filter(function (line, i) {
            return i < maxElements;
        })
        .value()
        .join('\n');
}

module.exports.run = run;

