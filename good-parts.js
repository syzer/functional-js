/**
 * Created by syzer on 14/2/18.
 */

console.log(0.1 + 0.2 === 0.3); // major WTF in JS

// apply/ call
function callMe(arg1, arg2) {
    var s = "";
    s += " this value: " + this;
    for (i in callMe.arguments) {
        s += " arguments: " + callMe.arguments[i];
    }
    return s;
}

console.log("Original function:", callMe(1, 2));         // this is global object
console.log("Function called with apply:", callMe.apply(3, [4, 5])); // implicit
console.log("Function called with call:", callMe.call(2, 3, 4, 5));  // explicit

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    }, arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    } };


var status = flight.status || "unknown";        // using orr
console.log(status);        // unknown

// reflection
typeof flight.number;        // 'number'
typeof flight.status;        // 'string'
typeof flight.arrival;       // 'object'
typeof flight.manifest;      // 'undefined'

flight.hasOwnProperty('number');         // true

var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};
var add = function (a, b) {
    return a + b;
};

myObject.double = function () {
    var that = this; // Workaround.
    var helper = function () {
        that.value = add(that.value, that.value);
    };
    helper(); // Invoke helper as a function.
};

myObject.increment();
myObject.increment(2);
console.log(myObject.value);        //3

myObject.double();
console.log(myObject.value); // 6


// constructor, capitalized
var Quo = function (string) {
    this.status = string;
};
Quo.prototype.get_status = function () {
    return this.status;
};
// Make an instance of Quo.
var myQuo = new Quo("confused");
console.log(myQuo.get_status()); // confused

// hanoi

var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
};
hanoi(3, 'Src', 'Aux', 'Dst');


var factorial = function factorial(i, a) {
    a = a || 1;
    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i);
};
console.log(factorial(4));  //24

// weird scope


var foo = function () {
    var a = 3, b = 5;
    var bar = function () {
        var b = 7, c = 11;
// At this point, a is 3, b is 7, and c is 11
        a += b + c;
// At this point, a is 21, b is 7, and c is 11
    };
// At this point, a is 3, b is 5, and c is not defined
    bar();
// At this point, a is 21, b is 5
};


// closure
var myObject = function () {
    var value = 0;
    return {
        increment: function (inc) {             //longer life then outer function
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    };
}();

var quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    };
};
var myQuo = quo("amazed");
console.log(myQuo.get_status());    //amazed


// synchronus vs callbacks
//request = prepare_the_request();
//response = send_request_synchronously(request);
//display(response);
//
//request = prepare_the_request();
//send_request_asynchronously(request, function (response) {
//    display(response);
//});

"use strict";
// this
String.prototype.deentityify = function () {
    // maps entity names to characters.
    var entity = { quot: '"', lt: '<', gt: '>' };
    return function () {                                        // return
        // This is the deentityify method. It calls the string
        // replace method, looking for substrings that start
        // with '&' and end with ';'. If the characters in
        // between are in the entity table, then replace the
        // entity with the character from the table.
        return this.replace(/&([^&;]+);/g, function (a, b) {    // usage of this
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}();

console.log('&lt;&quot;&gt;'.deentityify()); // <">
console.log('other'.deentityify());          // other

String.prototype.lint = function () {
    var keyValMappings = {'<': 'nyan!', '>': 'rainbow!'};
    return function () {
        return this.replace(/%([^%;]+);/g, function (a, b) {    // usage of this
                var r = keyValMappings[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}();

console.log('%>;%<;'.lint());   //rainbow!nyan!

var serial_maker = function () {
// Produce an object that produces unique strings. A unique string is made up
// of two parts: a prefix and a sequence number. The object comes with
// methods for setting the prefix and sequence number, and a gensym method
// that produces unique strings.
    var prefix = '';                        // protected!!!!
    var seq = 0;                            // protected!!!!
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function () {
            var result = prefix + seq;      // no that and this!!!
            seq += 1;
            console.log(result, prefix, seq);
            return result;
        }
    };
};
var seqer = serial_maker();
seqer.set_prefix = ('Q');
seqer.set_seq = (1000);
console.log(seqer, seqer['gensym'].toString());     // how JS holds an object
var unique = seqer.gensym();
console.log("unique", unique);              // unique should be "Q1000" but is 0

// fibonacci
var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
for (var i = 0; i <= 10; i += 1) {
    console.log('// ' + i + ': ' + fibonacci(i));       //calls it 453 times
}

// better to use memorization
var better_fibonacci = function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();
for (var i = 0; i <= 10; i += 1) {
    console.log('// ' + i + ': ' + better_fibonacci(i));       // calls it 18 times
}

// the Y combinator!!!!!! or memorizer
var memoizer = function (memo, fundamental) {
    var shell = function (n) {
        var result = memo[n];             // cache results of fundamentall to array
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    };
    return shell;
};
var fibonacci = memoizer([0, 1], function (shell, n) {
    return shell(n - 1) + shell(n - 2);
});
var factorial = memoizer([1, 1], function (shell, n) {
    return n * shell(n - 1);
});

// pretend privacy -> give property odd name and coders
// will pretend not to see this name :)

// spec - object with all data required/ value
// my - is a container, with all secrets
var constructor = function (spec, my) {
    var that;
    //var other private instance variables;
    my = my || {};

    //Add shared variables and functions to my like
    //my.member = value;

    //that = a new object;          //new object asigned to that

    //Add privileged methods to that
//    var methodical = function () {
//    };
//    that.methodical = methodical;
    return that;
};

// example
var mammal = function (spec) {
    var that = {};
    that.get_name = function () {
        return spec.name;
    };
    that.says = function () {
        return spec.saying || '';
    };
    return that;
};
var myMammal = mammal({name: 'Herb'});
console.log(myMammal.get_name());

//functional inheritance
var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);                // calling PARENT constructor
    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) s += '-';
            s += 'r';
        }
        return s;
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    }
    return that;
};
var myCat = cat({name: 'Henrietta'});
console.log(myCat.get_name());

// superior methods
Object.prototype.superior = function (name) {
    var that = this,
        method = that[name];
    return function () {
        return method.apply(that, arguments);
    };
};

var coolcat = function (spec) {
    var that = cat(spec);
    var super_get_name = that.superior('get_name');
    that.get_name = function (n) {
        return 'like ' + super_get_name() + ' baby';
    };
    return that;
};
var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
console.log(name);              // 'like meow Bix meow baby'

// partials functions with bind
function list() {
    return Array.prototype.slice.call(arguments);
}
var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
//console.log(list1, list2, list3);

// bind with modules
this.x = 9;
var module = {
    x: 81,
    getX: function () {
        return this.x;
    }
};
module.getX();       // 81

var getX = module.getX;
getX();             // 9, because in this case, "this" refers to the global object

// create a new function with 'this' bound to module
var boundGetX = getX.bind(module);
boundGetX();        // 81


// composing objects from parts
var eventuality = function (that) {
    var registry = {};
    that.fire = function (event) {
// Fire an event on an object. The event can be either
// a string containing the name of the event or an
// object containing a type property containing the
// name of the event. Handlers registered by the 'on'
// method that match the event name will be invoked.
        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ? event : event.type;
// If an array of handlers exist for this event, then
// loop through it and execute the handlers in order.
        if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for (i = 0; i < array.length; i += 1) {
                handler = array[i];
// A handler record contains a method and an optional
// array of parameters. If the method is a name, look
// up the function.
                func = handler.method;
                if (typeof func === 'string') {
                    func = this[func];
                }
// Invoke a handler. If the record contained
// parameters, then pass them. Otherwise, pass the
// event object.
                func.apply(this,
                    handler.parameters || [event]);
            }
        }
        return this;
    };
    that.on = function (type, method, parameters) {

// Register an event. Make a handler record. Put it
// in a handler array, making one if it doesn't yet
// exist for this type.

        var handler = {
            method: method,
            parameters: parameters
        };
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    return that;
};

// reduce
Array.prototype.reduce = function (f, value) {
    var i;
    for (i = 0; i < this.length; i += 1) {
        value = f(this[i], value);
    }
    return value;
};
var add = function (a, b) {
    return a + b;
};
var data = [4, 8, 15, 16, 23, 42];
var sum = data.reduce(add, 0);    // sum is 108
console.log(sum);


function minOfArray(arr) {
    var min = Infinity;
    var QUANTUM = 32768;

    for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
        var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
        min = Math.min(submin, min);
    }

    return min;
}

var min = minOfArray([5, 6, '2', 3, '1', 7]);
console.log(min);   // 1

function LateBloomer() {
    this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function () {
    this.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function () {
    console.log('I am a beautiful flower with ' + this.petalCount + ' petals!');
};
var bloomer = LateBloomer();


// Function by takes a member name string and returns
// a comparison function that can be used to sort an
// array of objects that contain that member.
var by = function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw {
                name: 'Error',
                message: 'Expected an object when sorting by ' + name
            }
        }
    };
};
var s = [
    {first: 'Joe', last: 'Besser'},
    {first: 'Moe', last: 'Howard'},
    {first: 'Joe', last: 'DeRita'},
    {first: 'Shemp', last: 'Howard'},
    {first: 'Larry', last: 'Fine'},
    {first: 'Curly', last: 'Howard'}
];
s.sort(by('last'), by('first'));
console.log(JSON.stringify(s));

// hasOwnProperty
var a = {member: true};
var b = Object.create(a);               // from Chapter 3
var t = a.hasOwnProperty('member');     // t is true
var u = b.hasOwnProperty('member');     // u is false   !!!!
var v = b.member;                       // v is true

var isNumber = function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}
console.log(isNumber('44')); // false

//NaN = "a";
//undefined = "b";
//console.log(NaN, undefined);
