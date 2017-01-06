/**
 * Created by syzer on 11/14/2014.
 */

const Promise = require('bluebird')

const promiseWhile = function (condition, action) {
    const resolver = Promise.defer()

    const loop = function () {
        if (!condition()) {
            return resolver.resolve()
        }
        return Promise.cast(action())
            .then(loop)
            .catch(resolver.reject)
    }

    process.nextTick(loop)

    return resolver.promise
}

// And below is a sample usage of this promiseWhile function
let sum = 0,
    stop = 10

promiseWhile(() => {
// Condition for stopping
    return sum < stop
}, () => {
    // The function to run, should return a promise
    return new Promise((resolve, reject) => {
        // Arbitrary 250ms async method to simulate async process
        setTimeout(() => {
            sum++
            // Print out the sum thus far to show progress
            console.log(sum)
            resolve()
        }, 250)
    })
}).then(() => {
// Notice we can chain it because it's a Promise, this will run after completion of the promiseWhile Promise!
    console.log('Done')
})
