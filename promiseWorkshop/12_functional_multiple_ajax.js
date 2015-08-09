/**

 Let's refactor this function using the popular "lodash" library.  Install it with:

 npm install --save lodash

 In particular, you may want to use _.bind, _.compose, or others as you see fit.

 The solution will work out of the box since the problem is the same as the previous.
 Focus on reasoning about how to use function composition to make your promise chain
 as declarative as possible.  Refer to the provided solution once you have given it
 some thought and see if you can completely understand it.
 */

"use strict";

var q = require('bluebird');
var Q = require('q');
var request = q.promisify(require("request"));
var _ = require('lodash');

function then(func) {
    return function (prom) {
        return prom.then(func);
    };
}

function returnSecondArg(data) {
    return data[1];
}

function addUserId(userId) {
    return 'http://localhost:7001/' + userId;
}

var pipeline = _.flow(request, then(returnSecondArg), then(addUserId), then(request), then(returnSecondArg));
pipeline('http://localhost:7000').then(function (data) {
    console.log(data);
});

