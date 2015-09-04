"use strict";

var items = [
    {name: "mike", income: 2563},
    {name: "kim", income: 1587},
    {name: "liz", income: 3541},
    {name: "tom", income: 2475},
    {name: "bello", income: 987},
    {name: "frank", income: 2975}
];

//* Calculates the average income across all of the freelancers.
//* Puts the freelancers into two groups:
//    underperform their income is less than or equal to the average income.
//    overperform their income is greater than the average income.
//
//* Sorts the freelancers within the two groups by their income with the lowest first.
var out = {
    "average": 167,
    "underperform": [
        {"name": "foobar", "income": 99},
        {"name": "dummy", "income": 100}
    ],
    "overperform": [
        {"name": "foo", "income": 302}
    ]
};

var _ = require('lodash');

function avarageFilter(items) {
    items = _(items).sortBy(getIncome).value();

    var avg = items.reduce(function (acc, el) {
            acc += el.income;
            return acc;
        }, 0) / items.length;

    var avgGte = _.curry(_.gte)(avg);
    var isIncomeLteAvg = function(el) {
        return avgGte(el.income);
    };
    //var isIncomeGtAvg = _.not(isIncomeGteAvg);

    return {
        average: avg,
        underperform: items.filter(isIncomeLteAvg),
        overperform: items.filter(function(el) {
            return avg < el.income;
        })
    };

    function getIncome(el) {
        return el.income;
    }
}

module.exports = avarageFilter;
console.log(avarageFilter(items));
