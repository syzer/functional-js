/**
 * Created by syzer on 8/27/2014.
 */

//TEMPLATE FOR SOLUTIONS
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


function daVyncy(line, i) {

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
