"use strict";

// We have a list of words that we want to modify.
var words = ['Test', 'Hello', 'World', 'Node', 'JavaScript'];

// We want to modify each word so that they are all appended with the word Chained, converted to uppercase, and sorted by alphabetical order. The result should look like this:
var out = ['HELLOCHAINED', 'JAVASCRIPTCHAINED', 'NODECHAINED', 'TESTCHAINED', 'WORLDCHAINED'];

var _ = require('lodash');


function chaining(items) {
    return _(items)
        .sort()     // or sortBy    
        .map(function(el) {
            return el.toUpperCase() + 'CHAINED';
        })
        .value();
}

module.exports = chaining;