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

//TODO sort
function groupSum(items) {
    return items.reduce(function (acc, el) {
            acc[el.article].total_orders = (acc[el.article].total_orders + 1 )|| 0;
            return acc;
        },
        []);
}

module.exports = groupSum;