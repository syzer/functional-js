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
const [car2, ...cdr2] = [1, 2, 3, 4, 5];

log(car2);
//=> 1
log(cdr2);
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
log(':)', map2((x)=>(x + x), [1, 2, 3]));

// lisp
const cons = (a, d) => [a, d],
    car = ([a, d]) => a,
    cdr = ([a, d]) => d;
const oneToFive = cons(1, cons(2, cons(3, cons(4, cons(5, null)))));
log(oneToFive);
//=>[ 1, [ 2, [ 3, [Object] ] ] ]

const SecretDecoderRing = {
    encode (plaintext) {
        return plaintext
            .split('')
            .map(char => char.charCodeAt())
            .map(code => code + 1)
            .map(code => String.fromCharCode(code))
            .join('');
    },
    decode (cypherText) {
        return cypherText
            .split('')
            .map(char => char.charCodeAt())
            .map(code => code - 1)
            .map(code => String.fromCharCode(code))
            .join('');
    }
};
log(SecretDecoderRing.encode('wow wow'));

const user = {
    name: {
        first: "Super",
        last: "Man"
    },
    occupation: {
        title: "Author",
        responsibilities: ["JavaScript Allongé",
            "JavaScript Spessore",
            "CoffeeScript Ristretto"
        ]
    }
};
const {name: { first: given, last: surname}, occupation: { title: title } } = user;
const descr = ({name: { first: given }, occupation: { title: title } }) =>
    `${given} is a ${title}`;

log(descr(user));
log(surname, title);

const EMPTY = {};

var test = (() => {
    let age = 49;

    if (true) {
        let age = 50;
    }
    return age;
})();
//var vs let:  50 vs 49
log(test);


const FibonacciIterator = () => {
    let previous = 0,
        current = 1;

    return () => {
        const value = current;

        [previous, current] = [current, current + previous];
        return {done: false, value};
    };
};

const fib = FibonacciIterator();

fib().value;
//=> 1
fib().value;
//=> 1
fib().value;
//=> 2
fib().value;
//=> 3
fib().value;
//=> 5


const take = (iterator, numberToTake) => {
    let count = 0;

    return () => {
        if (++count <= numberToTake) {
            return iterator();
        } else {
            return {done: true};
        }
    };
};

const toArray = (iterator) => {
    let eachIteration,
        array = [];

    while ((eachIteration = iterator(), !eachIteration.done)) {
        array.push(eachIteration.value);
    }
    return array;
};

toArray(take(FibonacciIterator(), 5));
//=>[ 1, 1, 2, 3, 5 ]


const NumberIterator = (number = 0) =>
    () => ({ done: false, value: number++ });


toArray(take(NumberIterator(1)), 5);
//=> [1, 9, 25, 49, 81]


const filterIteratorWith = (fn, iterator) =>
    () => {
        do {
            const {done, value} = iterator();
        } while (!done && !fn(value));
        return {done, value};
    };

const firstInIteration = (fn, iterator) =>
    take(filterIteratorWith(fn, iterator), 1);

//const K = (x) => (y) => x;
const I = (x) => (x);
const V = (x) => (y) => (z) => z(x)(y);

const fortyTwo = K(42);
log(fortyTwo(5)); // => 42

// no context preservation
const maybeish = (fn) =>
    x => !!x ? fn(x) : x;

const someObject = {
    setSize: maybe(function (size) {
        this.size = size;
    })
};

someObject.setSize(5);
log(someObject); //=> { setSize: [Function], size: 5 }

someObject.setSize(null);
log(someObject); //=> { setSize: [Function], size: 5 }

const mapWith = (fn) => (array) => map(array, fn);
const getWith = (attr) => (object) => object[attr];
const inventory = {
    apples: 0,
    oranges: 144,
    eggs: 36
};

console.log(getWith('oranges')(inventory));
const inventories = [
    { apples: 0, oranges: 144, eggs: 36 },
    { apples: 240, oranges: 54, eggs: 12 },
    { apples: 24, oranges: 12, eggs: 42 }
];

console.log(mapWith(getWith('oranges'))(inventories));

const maybe2 = (fn) =>
    function (...args) {
        for (let i in args) {
            if (args[i] == null) return args[i];
        }
        return fn.apply(this, args);
    };


//console.log(mapWith(maybe2(getWith('oranges'))));