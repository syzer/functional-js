// http://vimeo.com/97408202

// combinators/decorators combinator
// flexibility + decluttering
// composition

// math concept:
// group of integers -> other integers
// monoid to get all integers


// adapters facades, interfaces, ORM AKA Vietnam of Modern Computing

// ideas scale up
// homogeneous -> (integers, with +)
// dense space -> space all things go together... closely
// sparse space - strongly types languages, you can build one correct program, harder to build , but is correct one


// how to make dense space flexible?


// in real world program distinct interfaces may be easier to read
// but large inheritances structure.. to figure out how it works u need to go thu 8-9 files
// strategy patterns

// flexible programs - sometimes are hard to read
// when u have flexible requirement( better to use flexible approach)

var print = console.log;

// pluck get :: array, property -> list values
function pluck(arr, key) {
    return arr.map(function (obj) {
        return obj[key];
    })
}

// pluckWith :: (property:String, array) -> list values
function pluckWith(key, arr) {
    return pluck(arr, key);
}

var peoples = [
    {name: 'moe', age: 20},
    {name: 'larry', age: 30}
];

pluckWith('name', peoples);      // [ 'moe', 'larry' ]

// how to make pluckWith from combinators ??

// combinator(function that takes function -> return function)
// unary combinator
function flip(fn) {
    return function flipped(a, b) {
        return fn.call(this, b, a);
    }
}
function arrow(a, b) {
    return "" + a + " -> " + b;
}
var flippedArrow = flip(arrow);
print(flippedArrow("x", "y"));        //=> y->x

// curry unary combinators
function curry(fn) {
    return function curried(a, optionalB) {
        if (arguments.length > 1) {
            return fn.call(this, a, optionalB);
        } else {
            return function partiallyApplied(b) {
                return fn.call(this, a, b);
            }
        }
    }
}

var curriedArrow = curry(arrow);
print(curriedArrow('basel', 'zurich')); //=> basel -> zurich

var fromBaselTo = curriedArrow('basel');
print(fromBaselTo('zurich'));           //=> basel -> zurich

// HETEROGENEOUS -> Homogeneous interface -> makes it very flexible
// all your functions take only one argument(you can compose them very well)

// whole point of combinators:
// take function and return (decorated) function that makes sth different

function get(object, property) {
    return object[property];
}
get({foo: 1}, 'foo');       //=> 1

var getWith = curry(flip(get));
print(getWith('foo')({foo: 1}));   //=> 1

// JS . map is a method, so lets convert to function

function map(mappable, fn) {
    return mappable.map(fn, this);
}
function addOne(n) {
    return n + 1;
}
var double = function (num) {
    return num * 2;
};

print(map([1, 2, 3], addOne));    //=> [ 2, 3, 4 ]

var mapWith = curry(flip(map));
print(mapWith(addOne, [1, 2, 3]));


// pluckWith :: (property:String, array) -> list values
//function pluckWith(attr) {
//    return mapWith(getWith(attr));
//}


// combinator compose
// pipes 2 function together
function compose(a, b) {
    return function composed(c) {
        return a(b(c));
    }
}

var pluckWith = compose(mapWith, getWith);
print(pluckWith('name')(peoples)); // [ 'moe', 'larry' ]

// idea: functions that takes one argument are easy to compose
// if you make classes/object homogeneous -> its easier to work with them

// compose compose with sth :)
// FUNCTIONAL STYLE - is different then object style


// how to use combinators to make decorators
// decorator : a combinator function->function that is similar(semantically) than original
// not magically

var _ = require('lodash');

//CLASS example
// FLUID interface... AKA jquery
function Cake() {
    //
}
_.extend(Cake.prototype, {
    mix: function () {
        // mix

        return this; // fluent
    },
    bake: function () {
        // bake the cake

        return this;
    }
});

// AKA python decorator(is a combinators)
function fluent(methodBody) {
    return function fluentized() {
        methodBody.apply(this, arguments);   // apply this function
        return this;
    }
}

// easy to see that its fluent
_.extend(Cake.prototype, {
    mix: fluent(function () {
        // mix
    }),
    bake: fluent(function () {
        // bake the cake
    })
});


// new requirements arise:
// mixing is before baking
_.extend(Cake.prototype, {
    mix: fluent(function () {
        // mix
    }),
    bake: fluent(function () {
        this.mix();
        // bake the cake
    })
});


// :(
// AKA from Zend Framework Example
// all new function need to call mix first()
// Error handling ??
// single responsibility principle?? how the bake should care about mix
var stupid = {
    bake: function () {
        if (!this.isMixed) {
            this.mix()
        }
        // baking code
        return this;
    }
};


// ANSWER :
// combinator BEFORE!!
// AKA Aspect Oriented Programming
var before = curry(
    function decorate(decoration, method) {
        return function decoratedWithBefore() {
            decoration.apply(this, arguments);
            return method.apply(this, arguments);
        };
    }
);
var mixFirst = before(function () {
    this.mix();
});

// we change behavior of system without modifying original design
// split main thing, with other things without cluttering code
_.extend(Cake.prototype, {
    mix: fluent(function () {
        // mix
    }),
    bake: fluent(mixFirst(function () {
        // bake the cake
    }))
});

// declutter secondary concerns
// like logging, error handling
// that were hard to reuse/debug


// decorators are like functional mixing,


var after = curry(
    function decorate(decoration, method) {
        return function decoratedWithAfter() {
            var returnValue = method.apply(this, arguments);
            decoration.apply(this, arguments);
            return returnValue;
        };
    }
);

var iWasCalledWith = function (/*args*/) {
    console.log('I was called with', arguments)
};

print("HERE:", after(iWasCalledWith, double)(4));
var doubleAndPrint = after(double, print);
after(iWasCalledWith, doubleAndPrint)(4);


// I was called with { '0': 'name' }
// [ 'moe', 'larry' ]
var pluckWithWithLogging = after(iWasCalledWith, pluckWith);
print(pluckWithWithLogging('name')(peoples));


// wraps function around functionality
// AKA try... catch
var around = curry(
    function decorate(decoration, method) {
        return function decoratedWithAround() {
            var methodPrepended = [method].concat(
                [].slice.call(arguments, 0)
            );
            return decoration.apply(this, methodPrepended);
        };
    }
);


//TODO!!! around and after
function iGiveError(/*args*/) {
    throw "42";// + arguments.toString();

}
//var testAround = around(iGiveError);
//print(testAround(666)(443));


// ORM -> elegant way
// quite common... when no values no errors.. instead asking isNull, or null object pattern


// call me maybe, (maybe monad)ee
var maybe = around(function (fn, value) {
    // if existy
    if (value != null) {
        return fn.call(this, value);
    }
});

print(maybe(addOne)(2));     // 3
print(maybe(addOne)(null));  // undefined
//print(maybe(maybe(addOne)(2))(2));

// generalize guards
function provided(guard) {
    return around(function () {
        var fn = arguments[0],
            values = [].slice.call(arguments, 1);

        if (guard.apply(this, values)) {
            return fn.apply(this, values);
        }
    });
}

var maybe = provided(function (value) {
    return value != null;
});


// TODO auth check
// TODO maybe 2nd example
print(maybe(addOne)(2));            //3
print(maybe(addOne)(null));         // undefined


// TODO make it to slide/challenge
// inversions
function not(fn) {
    return function notted() {
        return !fn.apply(this, arguments);
    }
}
var except = compose(provided, not);
var maybe = except(function (value) {
    return value == null;
});


// java, cpp : control flow as part of syntax (switch, case, if else)
// smalltalk : if else -> methods
// if combinators used -> more flexible easier to change existing code blocks


// kinda like template method... when your object calls
// superclass methods to do some things.. and some things are overwritten in child class
// the more flexible you get
// the more thinking you have to put to things
// but still FP is more reusable

// SOLID: there's main reason for function... and secondary concerns
// decorators... help declutter it
// ruby.. has rails... object life cycle methods


// decorators in python... or javascript


// TAKE AWAY:
// make interfaces more homogeneous -> easier to combine them
// more flexibility
// trade off: harder to read when you don't know those techniques

// TODO challenge, can make combinator when you call me twice, throw exception
