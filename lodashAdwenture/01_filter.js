"use strict";

var _ = require('lodash');

var users = [
    {id: 22, username: "martin", active: true},
    {id: 23, username: "max", active: false},
    {id: 24, username: "linda", active: false}
];

// [].filter() would not iterate on objects
function filterWhere(items) {
    return _.where(items, {active: true});
}

module.exports = filterWhere;