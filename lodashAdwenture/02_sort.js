"use strict";

// sort characters by quantity from highest to lowest

var _ = require('lodash');

var characters = [
    {article: 41, quantity: 24},
    {article: 2323, quantity: 2},
    {article: 655, quantity: 23}
];

function sort(items) {
    return _.sortBy(items, function (item) {
        return -item.quantity;
    });
}

/* Also possible:
 return _.sortBy(collection,"quantity").reverse();
 */

module.exports = sort;