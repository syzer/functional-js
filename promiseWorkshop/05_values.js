/**
 * NO!  Fulfillment handlers may return promises OR values.  Your
 Promises/A+ library will do the correct thing and wrap your
 return value in a promise if need be.  This is awesome because
 it allows you to intermix values with promises in a chain.

 Imagine that you have a a cache of models that may already contain
 a model you would like to request from the server.  You could
 check your cache synchronously and return the found value OR send
 an ajax request to your remote server to fetch it.

 Wrapping this functionality in a promise means that both behaviors
 can be consumed under a single abstraction:
 */
var q = require('q');
var defer = q.defer();

function attachTittle (arg) {
    "use strict";
    return "DR. " + arg;
}

defer.promise
    .then(attachTittle)
    .then(console.log);

// executed in next event loop
defer.resolve("MANHATTAN");
