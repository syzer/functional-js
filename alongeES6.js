'use strict';
//var _ = require('lodash');
var _ = require('lodash-fp');

const callFirst = (fn, larg) =>
    function (...rest) {
        return fn.call(this, larg, ...rest);
    };

const callLast = (fn, rarg) =>
    function (...rest) {
        return fn.call(this, ...rest, rarg);
    };

const callLeft = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...args, ...remainingArgs);

const callRight = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...remainingArgs, ...args);

const greet = (me, you) =>
    `Hello, ${you}, my name is ${me}`;

const heliosSaysHello = callFirst(greet, 'Helios');

var log = console.log;

log(heliosSaysHello('Eartha'));
//=> 'Hello, Eartha, my name is Helios'

const sayHelloToCeline = callLast(greet, 'Celine');

log(sayHelloToCeline('Eartha'));
//=> 'Hello, Celine, my name is Eartha'

log(callFirst(greet, 'Adri')('Lukas')
    === callLeft(greet, 'Adri')('Lukas'));
//=> true

const unary = (fn) =>
    fn.length === 1
        ? fn
        : function (something) {
        return fn.call(this, something)
    };

log(['1', '2', '3'].map(unary(parseInt)));

// “K Combinator,” nicknamed the “Kestrel:”
const K = (x) => (y) => x;

// return result or call function with result
// its from linux shell
// poor-mans debugger
const tap = (value) =>
    (fn) => (
        typeof(fn) === 'function' && fn(value),
            value
    );

tap('espresso')((it) => {
    console.log(`Our drink is '${it}'`)
});
//=> Our drink is 'espresso'
//'espresso'

// just return
tap('espresso')();

_.tap('espresso', (it) =>
    console.log(`Our drink is '${it}'`)
);

//tap with curried and uncurried
const tap2 = (value, fn) => {
    const curried = (fn) => (
        typeof(fn) === 'function' && fn(value),
            value
    );

    return fn === undefined
        ? curried
        : curried(fn);
};

const repeat = (num, fn) =>
    (num > 0)
        ? (repeat(num - 1, fn), fn(num))
        : undefined;

repeat(3, function (n) {
    console.log(`Hello ${n}`)
});

const maybe = (fn) =>
    function (...args) {
        if (args.length === 0) {
            return;
        }
        for (let arg of args) {
            if (arg == null) return;
        }
        return fn.apply(this, args)
    };

maybe((a, b, c) => a + b + c)(1, 2, 3);
//=> 6

maybe((a, b, c) => a + b + c)(1, null, 3);
//=> undefined

const once = (fn) => {
    let done = false;

    return function () {
        return done ? undefined : ((done = true), fn.apply(this, arguments))
    }
};

const askedOnBlindDate = once(
    () => "sure, why not?"
);

askedOnBlindDate();
//=> 'sure, why not?'

askedOnBlindDate();
//=> undefined

// gather rest of args on RIGHT!
function team(coach, captain, ...players) {
    console.log(`${captain} (captain)`);

    players.forEach(player => log(player));

    console.log(`${coach} (coach)`);
}

team('Luis Enrique', 'Xavi Hernández', 'Marc-André ter Stegen',
    'Martín Montoya', 'Gerard Piqué');
//=>
//Xavi Hernández (captain)
//Marc-André ter Stegen
//Martín Montoya
//Gerard Piqué
//Luis Enrique (coach)

