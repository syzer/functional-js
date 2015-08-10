"use strict";
//please write a function that takes in a hashtable or associative array of
//European towns with their populations in millions:

var towns = {
    Hamburg: {population: 1.698},
    Strasbourg: {population: 0.272},
    Rome: {population: 2.753},
    Dublin: {population: 0.528}
};

//We want a new size attribute added to every town where the value depends on
//the town's population, as follows:

var output = {
    City1: {population: 1.58, size: 'big'},
    City2: {population: 0.58, size: 'med'},
    City3: {population: 0.28, size: 'small'}
};


var _ = require('lodash');

function groupBy(items) {
    return _.forEach(items, function (item) {
        item.size = 'small';

        if (item.population > 0.5) {
            item.size = 'med';
        }
        if (item.population > 1.0) {
            item.size = 'big';
        }

        return item;
    });
}

module.exports = groupBy;