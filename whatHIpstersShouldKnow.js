/**
 * Created by syzer on 11/5/2014.
 */
// what hippster should know about FP by Stokke
function square(x) {
    "use strict";
    return x * x;
}

// add three mutates funciton
function addThree(fun) {
    "use strict";
    return function (x) {
        return fun(x) + 3;
    }
}

var p = console.log;
p(addThree(square)(5));  //=>28

var pinkie = {
    name: "pinkie",
    type: "furry"
};

function ponyType(pony) {
    "use strict";
    return pony.type;
}
p(ponyType(pinkie));  //=> furry

var other = null;
//ponyType(other);  //=> exception

// combinator
function nullCheck(func) {
    return function (x) {
        if (x === null) {
            return null;
        }
        return func(x);
    }
}
var safePonyType = nullCheck(ponyType);
p(safePonyType(other));     //=> Null
p(safePonyType(pinkie));    //=> pinkie


// composition = code reuse
function CAPS(str) {
    "use strict";
    return str.toUpperCase();
}

function hi(str) {
    "use strict";
    return "hello " + str + ' !';
}

function compose(func1, func2) {
    "use strict";
    return function (x) {
        return func2(func1(x))
    }
}
var loudHi = compose(hi, CAPS);
p(loudHi(pinkie.name));

// applicative functors(f(x)->f(y) AKA map,filter,reduce)
// functor + applicative map function
// applicative map

function hug(p1, p2) {
    "use strict";
    return p1 + 'hug' + p2;
}

// curring
// f(x,y,z) = g(x)(y)(z)
// Moses Schonfinkel => schonfinkeling
var _ = require('lodash');

function add(/*args*/) {
    "use strict";
    // args are array
    var args = Array.prototype.slice.call(arguments, 0);
    args.sort();
    return args.reduce(function (a, b) {
        return a + b;
    })
}
p(add(1,2));
