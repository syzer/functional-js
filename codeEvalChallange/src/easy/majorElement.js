/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function majorElement(line, i) {
    var data = line.split(',');
    var out = _(data)
        .countBy()
        .pairs()
        .max(function (el, key){
            return el[1]
        })
        .value();
    return out[1] > data.length/2 ? out[0] : 'None';
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
    return readLines(input, majorElement);
}

module.exports.run = run;
