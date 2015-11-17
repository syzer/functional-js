'use strict';
//tun with `babel-node alongeES6.js`
// node 5 dont support destructuring statement

//https://leanpub.com/javascriptallongesix/read
//book notes allonge six edition
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

team('Luis Enrique', 'Xavi Hernández utf-8', 'Marc-André ter Stegen',
    'Martín Montoya', 'Gerard Piqué');
//=>
//Xavi Hernández (captain)
//Marc-André ter Stegen
//Martín Montoya
//Gerard Piqué
//Luis Enrique (coach)

// RIGHT variadic
const firstAndRest = (first, ...rest) => [first, rest];
firstAndRest(1, 2, 3, 4);
//[ 1, [ 2, 3, 4 ] ]

//
const [car, ...cdr] = [1, 2, 3, 4, 5];

log(car);
//=> 1
log(cdr);
//=>[2,3,4,5]

const description = (nameAndOccupation) => {
    if (nameAndOccupation.length < 2) {
        return ["", "occupation missing"]
    }
    const [[first, last], occupation] = nameAndOccupation;
    return [`${first} is a ${occupation}`, "ok"];
};

const [reg, status] = description([["SuperMan", "Clark Kent"], "programmer"]);
log(reg, status);

const [reg2, status2] = description([["SuperMan", "Clark Kent"]]);
log(reg2, status2);

// recursive flatten with ...
const flatten = ([first, ...rest]) => {
    if (!first) {
        return [];
    }
    else if (!Array.isArray(first)) {
        return [first, ...flatten(rest)];
    }
    else {
        return [...flatten(first), ...flatten(rest)];
    }
};

log(flatten(["foo", [3, 4, 5, []]]));
//=> [ 'foo', 3, 4 ]

const squareAll = ([first, ...rest]) =>
    !first ? [] : [first * first, ...squareAll(rest)];

log(squareAll([1, 2, 3, 4, 5]));

// !first will coerce bollean
const map = (fn, [first, ...rest]) =>
    first === undefined ? [] : [fn(first), ...map(fn, rest)];

map((x)=>(x + 1), [1, 2, 3]);
//[2,3,4]

const truthyAll = ([first, ...rest]) =>
    first === undefined ? [] : [!!first, ...truthyAll(rest)];

log(truthyAll([null, true, 25, false, "foo"]));
//=>[ false, true, true, false, true ]

log(map((x) => !!x, [null, true, 25, false, "foo"]));
//=> [false,true,true,false,true]

const reduce = (fn, terminalValue, [first, ...rest]) =>
    first === undefined
        ? terminalValue
        : fn(first, reduce(fn, terminalValue, rest));

const add = (x, y) => (x + y);

log(reduce(add, 0, [1, 2, 3, 4, 5]));
//=>
//15

// map as reduces, dont work FIXME
//const map2 = (fn, array) => reduce((first, rest) => [fn(first), ...rest], [], array);
//const squareAll2 = (array) => map2((x) => x * x, array);
//log(squareAll2(1,2,3));


// defaults arguments
const factorial = (n, work = 1) =>
    n === 1
        ? work
        : factorial(n - 1, n * work);

factorial(1);
//=> 1

factorial(6);
//=> 720

//defaults desctructuring
const [first, second = "two"] = ["one"];
log(`${first} . ${second}`);

// here to prove code retreat is doable map witout loop and if
const falsy = (condL, condR) => condL !== condR;
const map2 = (fn, [first, ...rest]) =>
    (falsy(first) && []) && [fn(first), ...map2(fn, rest)];
console.log(':)', map2((x)=>(x + x), [1, 2, 3]));
