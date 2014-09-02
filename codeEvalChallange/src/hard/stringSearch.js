/**
 * Created by syzer on 8/30/2014.
 */

var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function stringSearch(line, i,j) {
    var data = line.split(',');
    var string = data[0];
    var search = data[1];

    var i = 0;
    j = j || 0;
    while (string.charAt(i)!==search.charAt(j)) i++;
    if (prevChar==='\') {

        }

    return _(string).reduce(function(acc, char, i) {

    }, false)
}

function run(input) {
    return readLines(input, stringSearch);
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
