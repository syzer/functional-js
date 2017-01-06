/**
 * Created by syzer on 11/25/2014.
 */
// http://blog.jcoglan.com/2013/03/30/callbacks-are-imperative-promises-are-functional-nodes-biggest-missed-opportunity/
    // TODO rsvp changed API , need to pass resolver

let Promise = require('rsvp').Promise,
    util = require('util')

const list = function (promises) {
    const listPromise = new Promise()
    for (const k in listPromise) {
        promises[k] = listPromise[k]
    }

    let results = [],
        done = 0

    promises.forEach((promise, i) => {
        promise.then(result => {
            results[i] = result
            done += 1
            if (done === promises.length) {
                promises.resolve(results)
            }
        }, error => {
            promises.reject(error)
        })
    })

    if (promises.length === 0) {
        promises.resolve(results)
    }
    return promises
}

const LazyPromise = function (factory) {
    this._factory = factory
    this._started = false
}
util.inherits(LazyPromise, Promise)

LazyPromise.prototype.then = function () {
    if (!this._started) {
        this._started = true
        const self = this

        this._factory((error, result) => {
            if (error) {
                self.reject(error)
            } else {
                self.resolve(result)
            }
        })
    }
    return Promise.prototype.then.apply(this, arguments)
}

const delayed = new LazyPromise(callback => {
    console.log('Started')
    setTimeout(() => {
        console.log('Done')
        callback(null, 42)
    }, 1000)
})

// delayed.then(console.log);
// delayed.then(console.log);
// delayed.then(console.log);

const DELAY = 1000

const Module = function (name, deps, factory) {
    this._factory = function (callback) {
        list(deps).then(apis => {
            console.log('-- module LOAD: ' + name)
            setTimeout(function () {
                console.log('-- module done: ' + name)
                const api = factory.apply(this, apis)
                callback(null, api)
            }, DELAY)
        })
    }
}
util.inherits(Module, LazyPromise)

const A = new Module('A', [], () => {
    return {
        logBase(x, y) {
            return Math.log(x) / Math.log(y)
        }
    }
})

const B = new Module('B', [A], a => {
    return {
        doMath(x, y) {
            return 'B result is: ' + a.logBase(x, y)
        }
    }
})

const C = new Module('C', [A], a => {
    return {
        doMath(x, y) {
            return 'C result is: ' + a.logBase(y, x)
        }
    }
})

const D = new Module('D', [B, C], (b, c) => {
    return {
        run(x, y) {
            console.log(b.doMath(x, y))
            console.log(c.doMath(x, y))
        }
    }
})

D.then(d => {
    d.run(1000, 2)
})
