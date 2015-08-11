"use strict";

// We have an array of comments from the website:
var comments = [
    {username: "tim", comment: "you are doing a great job!"},
    {username: "tim", comment: "when you have new workshoppers?"},
    {username: "cat_lover", comment: "wtf? where are all the cats gone?"},
    {username: "max", comment: "where have you been on friday? we missed you!"},
    {username: "max", comment: "You don't answer anymore - why?"},
    {username: "cat_lover", comment: "MORE cats!!!"},
    {username: "max", comment: "i really love your site"}
];

// We want to modify each word so that they are all appended with the word Chained, converted to uppercase, and sorted by alphabetical order. The result should look like this:
var out = [
    {username: "foo", comment_count: 9},
    {username: "foobar", comment_count: 2}
];

var _ = require('lodash');


function removeDuplicates(items) {
    return _(items)
        .groupBy('username')
        .map(function(els, key, arr) {
            return {username: key, comment_count: _.size(els)}
        })
        .sortBy(function (item) {
            return -item.comment_count
        })
        .value();
}

module.exports = removeDuplicates;