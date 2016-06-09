/**
 * Created by syzer on 11/5/2014.
 */
// what hippster should know about FP by Stokke
function square(x) {
    return x * x
}

// add three mutates funciton
function addThree(fun) {
    return function (x) {
        return fun(x) + 3
    }
}

var p = console.log
p(addThree(square)(5))  //=>28

var pinkie = {
    name: "pinkie",
    type: "furry"
}

function ponyType(pony) {
    return pony.type
}
p(ponyType(pinkie))  //=> furry

var other = null
//ponyType(other)  //=> exception

// combinator
function nullCheck(func) {
    return function (x) {
        if (x === null) {
            return null
        }
        return func(x)
    }
}
var safePonyType = nullCheck(ponyType)
p(safePonyType(other))     //=> Null
p(safePonyType(pinkie))    //=> pinkie


// composition = code reuse
function CAPS(str) {
    return str.toUpperCase()
}

function hi(str) {
    return "hello " + str + ' !'
}

function compose(func1, func2) {
    return function (x) {
        return func2(func1(x))
    }
}
var loudHi = compose(hi, CAPS)
p(loudHi(pinkie.name))

// applicative functors(f(x)->f(y) AKA map,filter,reduce)
// functor + applicative map function
// applicative map

function hug(p1, p2) {
    return p1 + 'hug' + p2
}

// curring
// f(x,y,z) = g(x)(y)(z)
// Moses Schonfinkel => schonfinkeling
var _ = require('lodash')

function argum() {
    return [].slice.call(arguments[0]).sort()
}

//TODO make it exercise make best adder
function add(/*args*/) {
    //var args = [].slice.call(arguments).sort()
    return argum(arguments).reduce(function (a, b) {
        return a + b
    })
}
p(add(1, 2))

// arrity kow many ags function takes
p(_.curry(add, 3)(1)(2)(3)) //=>6

// partial application
var partiallyAdded = _.partial(add, 1, 2)
p(partiallyAdded(3)) // =>6

//TODO
function children() {
    return 'children'
}

// monads
// monads.. Libenitz? invented them
// 3 monads laws:
// 1. you do not talk about monads
// 2. you do not talk about monads ...
// kleisli triples ?
// function children
//compose(children, children) (ponies)

function listMonad() {
    "use strict"

}

//adapter
function unit(value) {
    "use strict"
    return [value]
}

// adapts lists to composoble
function bind(func) {
    "use strict"
    return function (list1) {
        var out = []
        list1.forEach()
        // concat
    }
}

//compose(bind(children), bind(children), bind(children))(unit(ponies))
