/**
 * Created by syzer on 8/7/2014.
 */
// https://www.youtube.com/watch?v=AvgwKjTPMmM

const _ = require('lodash')

const first = function (str) {
    return str.charAt(0)
}

const capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
}

const bigFirst = function (x) {
    return _(x).chain().map(capitalize).map(first).value()
}
const bigFirstBetter = function (x) {
    return _(x).chain().map(_.compose(capitalize, first)).value()
}

const caption = bigFirst(['ham', 'cake'])
const caption2 = bigFirstBetter(['ham', 'cake'])
console.log(caption)
console.log(caption2)

// g:: forall b. (t->b->b) ->b ->b
// reduce(c, n, build(g)) = g(c, n)

const build = function (g) {
    return g(push, [])
}

const map = _.curry((f, s) => {
    return build((c, n) => {
        return Array.reduce((acc, x) => {
            return c(f(x), acc)
        }, n, s)
    })
})

// var add = function (a) {
//    return function (b) {
//        return a + b;
//    }
// };
const add = function (a, b) {
    return a + b
}

const sum = function (acc, num, key, arr) {
//    console.log(acc, num, key, arr);
    console.log('+', num + acc)
    return num + acc
}

const sqr = function (x, num) {
    return x * x
}

const sumSqrs = function (arr) {
    return _(arr).reduce(_.compose(sqr, sum), 0)
}

// reduce(function(acc, x){return add(sqr(x), acc)}, 0);

// TODO debug
var result = sumSqrs([1, 2, 3])
console.log('should be 14: ', result)     // 12*12 =144

// var sumUp = _.reduce(add, 0);

const sumSqs = function (arr) {
//    return _(arr).map(sqr).sumUp().value();
    return _(arr).reduce((acc, x) => {
        return add(sqr(x), acc)
    }, 0)
}
var result = sumSqs([1, 2, 3])
console.log('1+4+9 is ', result)     // 9+4+1 = 14 OK

// WORKS FOR FUNCTORS + MONADS
// AUTOMATIC DEFORESTATION -> memoization

const addTwenty = _.memoize(x => {
    return x + 20
})

const p = console.log
p(addTwenty(10))   // 30
p(addTwenty(10))   // 30 , didn't run

// memoize  get posts, or any factory
const getPosts = _.memoize(id => {
    return new Future((err, res) => {
        $.getJSON('/posts/' + id, res)
    })
})
// getPosts(10)
// getPosts(10)    // didnt run

// TODO can i memoize whole app????????????
// parallel code
// add(2 ,3, 5)
// liftA3(fn, A1, A2, A3)
// var longCals = int => Future(Int)
// var collectResults = _.curry(function(res1, res2, res3));
// liftA3(collectResults, longCalc(20), longCalc(20), longCalc(20))

const characters = [
    {name: 'barney', age: 36},
    {name: 'fred', age: 40},
    {name: 'pebbles', age: 1}
]

const youngest = _.chain(characters)
    .sortBy('age')
    .map(chr => {
        return chr.name + ' is ' + chr.age
    })
    .first()        // can rearange first() with map
    .value()       // run computation
// → 'pebbles is 1'
p(youngest)

const toUpperCase = String.toUpperCase
// compose(g,h) => is assiociative () like (a+b)+c = a+(b+c)
// opipe data thu functions()
// null checks
// lences

// TODO import mekeLences

// var user = {id:1, name:'Ala'};
// var L = makeLences(['name']);
// view(L.name, user); // Ala
// set(L.name, 'Alex'); // {id:1, name:'Alex'}
// over(L.name, toUpperCase);

// every time return new object(immutable)

// composing lances, also polymorphic
// var L = makeLences(['name','first']);
// var firstNameChar = compose(L.name, L.first);
// over(firstnameChar, toUpperCase, user); // {id:1, name:'Ala', last:'day'}

// null checks
const val = null
if (val === null) {
    // checks
}

const allonge = require('allong.es')
const maybe = allonge.es.maybe

const mapWith = function (fn) {
    return function (arr) {
        return _(arr).map(fn).value()
    }
}

const maybeUpcase = mapWith(maybe(x => {
    return x.toUpperCase()
}))

p(maybeUpcase(['echo', null])) // [ ECHO, null ]
// NULL WAS SKIPPED!!!
// if (null){
//    null.toUpperCase();

// var composedMaybe = _.compose(maybeUpcase(['me']), maybeUpcase(['to']));
const f = function (x) {
    return 'f ' + x
}
const g = function (x) {
    return 'g ' + x
}

const test = ['apples', 'oranges']

// !!!! composiotion assiotiation
const composition = _.compose(mapWith(f), mapWith(g))
p(composition(test))
const composition2 = mapWith(_.compose(f, g))
p(composition2(test))

// Error handling(vs throw)
// Either

// future values:
// promises
// var Promise = require('promise');
// var Promise = allonge.es.promise; //require('promise');
const Q = require('q')
const prom = Q.defer()
mapWith(x => {
    return p(reverse(x))
}, prom)
prom.resolve([1, 2, 3])

// functor -> sth that implements MAP function
// maybe, either, promise

// vs nesting
// AKA node app
// _.compose(mjoin, mapWith);

// _.compose(mjoin, mapWith, mjoin, mapWith)

// vs null, 2  async results
// liftA2(f, A(x), A(y))
// maybe

require('pointfree-fantasy').expose(global)
const Maybe = require('pointfree-fantasy/instances/maybe')
const Either = require('pointfree-fantasy/instances/either')
const Promise = require('pointfree-fantasy/instances/promise')
// Maybe = function(val) {
//    this.val = val;
// };
// Maybe.prototype.map = function(f) {
//    return this.val ? Maybe(f(this.val)) : Maybe(null);
// };
// var liftA2 = function (fn, fn2, fn3) {
//    return mapWith(fn)([fn2, fn3]);
// };

const adder = function (x) {
    return function (y) {
        return x + y
    }
}
const maybe5 = liftA2(adder, Maybe(2), Maybe(3)) // 5 !!!
p(maybe5)
// if any null it will not run

// accumulation/reduce AKA monoid
// mconcat()
