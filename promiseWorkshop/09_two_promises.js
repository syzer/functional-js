/**
 Can you do what async do?

 When doing asynchronous programming you will often want to
 perform multiple operations in parallel.  In some cases
 you may wish to delay further processing until a list of
 async operations have completed.

 In synchronous code this is trivial because our operations
 are executed in the order they are specified:

 var thingOne = getThing(1);
 var thingTwo = getThing(2);

 combine(thingOne, thingTwo);

 We would like to build a function such that we can specify a list
 of asynchronous values we would like to fetch and then use once all
 are available.

 getAll([fetch(1), fetch(2)])
 .then(function (first, second) {
        console.log(first, second);
    });

 If your function is successful it should print out ["PROMISES", "FTW"] which is
 just someone's opinion man!

 create 2 promises
 resolve them with 2 diferent strings
 once they resolved console.log them

 USE SPREAD
 */

"use strict";

var q = require('bluebird');
var kris = require('q');
var defer1 = kris.defer();
var defer2 = kris.defer();

q.all([defer1.promise, defer2.promise]).spread(function (resp1, resp2) {
    console.log([resp1, resp2]);
});

setTimeout(function() {
    defer1.resolve('PROMISES');
    defer2.resolve('FTW');
}, 200);
