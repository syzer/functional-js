/**
 * Created by syzer on 11/14/2014.
 */

var Promise = require('bluebird');

var promiseWhile = function(condition, action) {
    var resolver = Promise.defer();

    var loop = function() {
        if (!condition()) return resolver.resolve();
        return Promise.cast(action())
            .then(loop)
            .catch(resolver.reject);
    };

    process.nextTick(loop);

    return resolver.promise;
};


// And below is a sample usage of this promiseWhile function
var sum = 0,
    stop = 10;

promiseWhile(function() {
// Condition for stopping
    return sum < stop;
}, function() {
    // The function to run, should return a promise
    return new Promise(function(resolve, reject) {
        // Arbitrary 250ms async method to simulate async process
        setTimeout(function() {
            sum++;
            // Print out the sum thus far to show progress
            console.log(sum);
            resolve();
        }, 250);
    });
}).then(function() {
// Notice we can chain it because it's a Promise, this will run after completion of the promiseWhile Promise!
    console.log("Done");
});
