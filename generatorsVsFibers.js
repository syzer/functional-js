/**
 * Created by syzer on 9/16/2014.
 */
//https://www.youtube.com/watch?v=B2ASp0jb6FY
// run with `gnode generatorsVsFibers.js`

// callback AKA callback hell
var fs = require('fs');
fs.readFile('README.md', 'utf8', function (err, content) {
    if (err) {
        throw err;
    } else {
        console.log(content.length);
    }
});

// monad promise
var Promise = require('bluebird');
Promise.promisifyAll(fs);
fs.readFileAsync('README.md')
    .then(JSON.parse)
    .then(function (val) {
        console.log(val.success);
    })
    .catch(SyntaxError, function (e) {
        console.error("invalid json in file");
    })
    .catch(function (e) {
        console.error("unable to read file")
    });

//still need use promisify
// callstack is changed, to


var Gen = function * () {
    var value = yield 6; //returns
    return value + 3;
}
var gen = Gen();
console.log(gen.next().value);   // 6
console.log(gen.next(6).value); // 9

// done : true means you can call next

//GENERATOR AS COORUTINE
var gen = Gen();
var yieldable = gen.next();

while (!yieldable.done) {
    yieldable = gen.next(yieldable.value);
}
return yieldable;

var next = function (gen, yieldable, cb) {
    if (!yieldable.done) {
        yieldable.value.then(function (val) {
            return next(gen, gen.next(val), cb);
        }).catch(function (e) {
        });

        yieldable.value.catch(function (err) {
            cb(err);
        })
    } else {
        cb(null, yieldable.value);
    }
};

// cooroutine
var co = function(fngen) {
    return function(cb) {
        // instiantiate gen
        var gensym = fngen();
        var yieldable = gensym.next();
        if (!yieldable.done) {
            next(gensym, yieldable, cb);
        } else {
            cb(null, yieldable.value);
        }
    }
};

var compose = function(A,B) {
    return function() {
        return B.call(this, A.apply(this, arguments));
    }
};

var oldFs = require('fs');

var composeGen = function (G1, G2) {
    return function * () {
        return yield G1.call(this, G2.call(this));
    };
}
//
var Gen1 = function * (next) {
    return yield next;
}
//
//var Gen2 = function() {
//    return yield oldFs.readFile('README.md', 'utf8');
//};
var Gen2 = function *() {
    return yield 6;
}

co(composeGen(Gen1, Gen2,(function(err, val){
    console.log(val.length, '?474');
})));


//TODO use KOA
var koa = require('koa');
var app = koa();
app.use(function *(next){
    this.status = 200;
    this.body = yield next;
});
app.use(function *(next){
    return "hi world";
});
