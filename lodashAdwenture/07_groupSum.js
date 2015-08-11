"use strict";

var articles = [
    {article: 1, quantity: 4},
    {article: 2, quantity: 2},
    {article: 1, quantity: 5}
];

// We want to know the total quantities ordered for each article.
// sorts the resulting array so that the articles with the highest number of orders are on top
var out = [
    {article: 1, total_orders: 9},
    {article: 2, total_orders: 2}
];

var _ = require('lodash');


function groupSum(items) {
    return _(items)
        .groupBy('username')
        .map(function (els, key, arr) {
            return {username: key, comment_count: _.size(els)}
        })
        .sortBy(function (item) {
            return -item.comment_count
        })
        .value();
}

module.exports = groupSum;