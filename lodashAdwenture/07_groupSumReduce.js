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
        .sortBy(function (item) {
            return -item.article;
        })
        .reduce(totalOrders, [])
}

function totalOrders(acc, el, i) {
    if (!_.isEmpty(acc) && _.last(acc).article === el.article) {
        acc[acc.length - 1] = {article: el.article, total_orders: (el.quantity + acc[acc.length - 1].total_orders)}
    } else {
        acc.push({article: el.article, total_orders: el.quantity});
    }

    return acc;
}

module.exports = groupSum;
