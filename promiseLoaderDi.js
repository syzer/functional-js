/**
 * Created by syzer on 11/25/2014.
 */
//http://blog.jcoglan.com/2013/03/30/callbacks-are-imperative-promises-are-functional-nodes-biggest-missed-opportunity/
    //TODO rsvp changed API , need to pass resolver


var Promise = require('rsvp').Promise,
    util    = require('util');

var list = function(promises) {
    var listPromise = new Promise();
    for (var k in listPromise) promises[k] = listPromise[k];

    var results = [], done = 0;

    promises.forEach(function(promise, i) {
        promise.then(function(result) {
            results[i] = result;
            done += 1;
            if (done === promises.length) promises.resolve(results);
        }, function(error) {
            promises.reject(error);
        });
    });

    if (promises.length === 0) promises.resolve(results);
    return promises;
};

var LazyPromise = function(factory) {
    this._factory = factory;
    this._started = false;
};
util.inherits(LazyPromise, Promise);

LazyPromise.prototype.then = function() {
    if (!this._started) {
        this._started = true;
        var self = this;

        this._factory(function(error, result) {
            if (error) self.reject(error);
            else self.resolve(result);
        });
    }
    return Promise.prototype.then.apply(this, arguments);
};

var delayed = new LazyPromise(function(callback) {
    console.log('Started');
    setTimeout(function() {
        console.log('Done');
        callback(null, 42);
    }, 1000);
});

//delayed.then(console.log);
//delayed.then(console.log);
//delayed.then(console.log);

var DELAY = 1000;

var Module = function(name, deps, factory) {
    this._factory = function(callback) {
        list(deps).then(function(apis) {
            console.log('-- module LOAD: ' + name);
            setTimeout(function() {
                console.log('-- module done: ' + name);
                var api = factory.apply(this, apis);
                callback(null, api);
            }, DELAY);
        });
    };
};
util.inherits(Module, LazyPromise);

var A = new Module('A', [], function() {
    return {
        logBase: function(x, y) {
            return Math.log(x) / Math.log(y);
        }
    };
});

var B = new Module('B', [A], function(a) {
    return {
        doMath: function(x, y) {
            return 'B result is: ' + a.logBase(x, y);
        }
    };
});

var C = new Module('C', [A], function(a) {
    return {
        doMath: function(x, y) {
            return 'C result is: ' + a.logBase(y, x);
        }
    };
});

var D = new Module('D', [B, C], function(b, c) {
    return {
        run: function(x, y) {
            console.log(b.doMath(x, y));
            console.log(c.doMath(x, y));
        }
    };
});


D.then(function(d) { d.run(1000, 2) });
