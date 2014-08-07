/**
 * Created by syzer on 8/7/2014.
 */
//https://www.youtube.com/watch?v=AvgwKjTPMmM

var _ = require('lodash');

var first = function (str) {
    return str.charAt(0);
};

var capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};

var bigFirst = function (x) {
    return _(x).chain().map(capitalize).map(first).value();
};
var bigFirstBetter = function (x) {
    return _(x).chain().map(_.compose(capitalize, first)).value();
};

var caption = bigFirst(['ham', 'cake']);
var caption2 = bigFirstBetter(['ham', 'cake']);
console.log(caption);
console.log(caption2);

// g:: forall b. (t->b->b) ->b ->b
// reduce(c, n, build(g)) = g(c, n)

var build = function (g) {
    return g(push, []);
};

var map = _.curry(function (f, s) {
    return build(function (c, n) {
        return Array.reduce(function (acc, x) {
            return c(f(x), acc);
        }, n, s)
    })
});

var add = function (a, b) {
    return a + b;
};


//TODO sum + square + fold in one iteration
//var acc=0;

var sum = function (acc, num, key, arr) {
    console.log(acc, num, key, arr);
//    console.log(a,b, acc);
//    acc = acc + a +b | 0;
//    console.log(acc);
    //return acc;
    console.log('+', num + acc);
    return num + acc;
};

var sqr = function (x) {
    return x * x;
};

var sumSqrs = function (arr) {
    return _(arr).reduce(_.compose(sqr, sum), 0);
};

// reduce(function(acc, x){return add(sqr(x), acc)}, 0);

//TODO debug
//var result = sumSqrs([1, 2, 3]);
//console.log(result);     // 12*12 =144

//var sumUp = _.reduce(add, 0);

var sumSqs = function (arr) {
//    return _(arr).map(sqr).sumUp().value();
    return _(arr).reduce(function (acc, x) {
        return add(sqr(x), acc);
    }, 0);
};
var result = sumSqs([1, 2, 3]);
console.log(result);     // 9+4+1 = 14 OK

// WORKS FOR FUNCTORS + MONADS
// AUTOMATIC DEFORESTATION -> memoization

var addTwenty = _.memoize(function (x) {
    return x + 20;
});

var p = console.log;
p(addTwenty(10));   // 30
p(addTwenty(10));   // 30 , didn't run

// memoize  get posts, or any factory
var getPosts = _.memoize(function (id) {
    return new Future(function (err, res) {
        $.getJSON('/posts/' + id, res);
    });
});
//getPosts(10)
//getPosts(10)    // didnt run

//TODO can i memoize whole app????????????
// parallel code
// add(2 ,3, 5)
//liftA3(fn, A1, A2, A3)
//var longCals = int => Future(Int)
//var collectResults = _.curry(function(res1, res2, res3));
//liftA3(collectResults, longCalc(20), longCalc(20), longCalc(20))

var characters = [
    { 'name': 'barney', 'age': 36 },
    { 'name': 'fred', 'age': 40 },
    { 'name': 'pebbles', 'age': 1 }
];

var youngest = _.chain(characters)
    .sortBy('age')
    .map(function (chr) {
        return chr.name + ' is ' + chr.age;
    })
    .first()        // can rearange first() with map
    .value();       // run computation
// → 'pebbles is 1'
p(youngest);


var toUpperCase = String.toUpperCase;
// compose(g,h) => is assiociative () like (a+b)+c = a+(b+c)
// opipe data thu functions()
// null checks
// lences

var makeLences = function (arr) {
    return {
        name: function name() {
            return arr[0].name
        }
    };

    return [].concat(arr);
};

//var user = {id:1, name:'Ala'};
//var L = makeLences(['name']);
//view(L.name, user); // Ala
//set(L.name, 'Alex'); // {id:1, name:'Alex'}
//over(L.name, toUpperCase);

// every time return new object(immutable)

// composing lances, also polymorphic
//var L = makeLences(['name','first']);
//var firstNameChar = compose(L.name, L.first);
//over(firstnameChar, toUpperCase, user); // {id:1, name:'Ala', last:'day'}

// null checks
var val = null;
if (null === val) {
    // checks
}

var allonge = require('allong.es');
var maybe = allonge.es.maybe;

var mapWith = function (fn) {
    return function (arr) {
        return _(arr).map(fn).value();
    }
};

var maybeUpcase = mapWith(maybe(function (x) {
    return x.toUpperCase();
}));

p(maybeUpcase(['echo', null])); //[ ECHO, null ]
// NULL WAS SKIPPED!!!
// if (null){
//    null.toUpperCase();

//var composedMaybe = _.compose(maybeUpcase(['me']), maybeUpcase(['to']));
var f = function (x) {
    return 'f ' + x;
};
var g = function (x) {
    return 'g ' + x;
};

var test = ['apples', 'oranges'];

// composiotion assiotiation
var composition = _.compose(mapWith(f), mapWith(g));
p(composition(test));
var composition2 = mapWith(_.compose(f,g));
p(composition2(test));

//Error handling(vs throw)
// Either

// future values:
// promises
//var Promise = require('promise');
//var Promise = allonge.es.promise; //require('promise');
var Q = require('q');
var prom = Q.defer();
mapWith(function(x){
    return p(reverse(x))
}, prom);
prom.resolve([1,2,3]);

// functor -> sth that implements MAP function
// maybe, either, promise

// vs nesting
// AKA node app
//_.compose(mjoin, mapWith);

//_.compose(mjoin, mapWith, mjoin, mapWith)

// vs null, 2  async results
//liftA2(f, A(x), A(y))
//maybe
Maybe = function(val) {
    this.val = val;
};
Maybe.prototype.map = function(f) {
    return this.val ? Maybe(f(this.val)) : Maybe(null);
};

var liftA2 = function (fn, fn2, fn3) {
    return mapWith(fn)([fn2, fn3]);
};
var maybe7 = liftA2(add, Maybe(2), Maybe(3));
p(maybe7); // Maybe(7)
// if any null it will not run

// accumulation/reduce AKA monoid
// mconcat()
