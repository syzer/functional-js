'use strict';
//https://leanpub.com/javascriptallongesix/read
//book notes allonge six edition
//nodemon -x babel-node alongeES6Iterators.js

const EMPTY = {
    isEmpty: () => true
};

const isEmpty = (node) => node === EMPTY;

const Pair1 = (first, rest = EMPTY) => ({
    first,
    rest,
    isEmpty () {
        return false
    },
    [Symbol.iterator] () {
        let currentPair = this;

        return {
            next () {
                if (currentPair.isEmpty()) {
                    return {done: true}
                }
                else {
                    const value = currentPair.first;

                    currentPair = currentPair.rest;
                    return {done: false, value}
                }
            }
        }
    }
});

const list = (...elements) => {
    const [first, ...rest] = elements;

    return elements.length === 0
        ? EMPTY
        : Pair1(first, list(...rest))
};


/////lib

const Numbers = {
    [Symbol.iterator] () {
        let n = 0;

        return {
            next: () =>
                ({done: false, value: n++})
        }
    }
};

const RandomNumbers = {
    [Symbol.iterator]: () => ({
        next () {
            return {value: Math.random()};
        }
    })
};

//for (let i of RandomNumbers) {
//    console.log(i);
//}

const mapWith = (fn, collection) =>({
    [Symbol.iterator] () {
        const iterator = collection[Symbol.iterator]();

        return {
            next () {
                const {done, value} = iterator.next();

                return ({done, value: done ? undefined : fn(value)});
            }
        }
    }
});

const Evens = mapWith((x) => 2 * x, Numbers);

//for (let i of Evens) {
//    console.log(i)
//}

const ZeroesToNines = mapWith((n) => Math.floor(10 * n), RandomNumbers);

//for (let i of ZeroesToNines) {
//    console.log(i)
//}

const filterWith = (fn, iterable) => ({
    [Symbol.iterator] () {
        const iterator = iterable[Symbol.iterator]();

        return {
            next () {
                var done, value;
                do {
                    var {done, value} = iterator.next();
                } while (!done && !fn(value));
                return {done, value};
            }
        }
    }
});

const untilWith = (fn, iterable) => ({
    [Symbol.iterator] () {
        const iterator = iterable[Symbol.iterator]();

        return {
            next () {
                let {done, value} = iterator.next();

                done = done || fn(value);

                return ({done, value: done ? undefined : value});
            }
        }
    }
});

// no way
//[...Numbers]

const Squares = mapWith((x) => x * x, Numbers);
const EndWithOne = filterWith((x) => x % 10 === 1, Squares);
const UpTo100 = untilWith((x) => (x > 100), EndWithOne);

// laizy
//console.log([...UpTo100]);
//console.log([...UpTo100]); // reseted

const first = (iterable) =>
    iterable[Symbol.iterator]().next().value;

const rest = (iterable) => ({
    [Symbol.iterator] () {
        const iterator = iterable[Symbol.iterator]();

        iterator.next();
        return iterator;
    }
});

Array.from(UpTo100);
//[ 1, 81 ]


Pair1.from = (iterable) => (function interationToList(iteration) {
    const {done, value} = iteration.next();

    return done ? EMPTY : Pair1(value, interationToList(iteration));
})(iterable[Symbol.iterator]());

const numberList = Pair1.from(untilWith((x) => (x > 1), Numbers));

//Pair1.from(Squares);

// iterators extract how to iterate
// from collection, and operation on that collection
// single responsibility


// generators
const empty = function * () {
};

empty().next();
//=>{"done":true}

// calls nly generates iterator
const only = function * (something) {
    yield something;
};

//console.log(only("you").next());

only("you").next();
//=>{"done":false, value: "you"}

let iterator = only("the lonely");
iterator.next();
//=>{"done":false, value: "the lonely"}

iterator.next();
//=> {"done":true}

// generator function
// generator is coorutine (suspend/start)
// encapsulate state AKA switch statement
const oneTwoThree = function * () {
    yield 1;
    yield 2;
    yield 3;
};

let iterator2 = oneTwoThree();  //=> iterator
iterator2.next();   // done:false value 1
iterator2.next();   // done:false, value:2
iterator2.next();   // done:false, value:3
iterator2.next();   // done:true

for (let i of oneTwoThree()) {
    console.log(i, i + 1);
}

//WAT in => of
for (let i in [1, 2, 3]) {
    console.log(i + 1);
}

console.log(...oneTwoThree());

const ThreeNumbers = {
    *[Symbol.iterator] () {
        yield 1;
        yield 2;
        yield 3
    }
};
for (let i of ThreeNumbers) {
    console.log(i);
}

const Fibonacci = {
    *[Symbol.iterator] () {
        let a, b;

        yield a = 0;

        yield b = 1;

        while (true) {
            [a, b] = [b, a + b];
            yield b;
        }
    }
};

// try in FFox
//for (let i of Fibonacci) {
//    console.log(i);
//}

const isIterable = (something) =>
    !!something[Symbol.iterator];

//layzy concat
const concat = (...iterables) => ({
    *[Symbol.iterator] () {
        for (let iterable of iterables) {
            for (let element of iterable) {
                yield element;
            }
        }
    }
});

const concatShorter = (...iterables) => ({
    *[Symbol.iterator] () {
        for (let iterable of iterables) {
            yield * iterable;
        }
    }
});

const lyrics = concat(["a", "b", "c"], ["one", "two", "three"], ["do", "re", "me"]);
console.log(lyrics); //=> {}
for (let word of lyrics) {
    console.log(word);
}

const lyrics2 = concatShorter(["a", "b", "c"], ["one", "two", "three"], ["do", "re", "me"]);
for (let word of lyrics2) {
    console.log(word);
}

const TreeIterable1 = (iterable) =>({
    *[Symbol.iterator] () {
        //[Symbol.iterator]: function* () {
        for (let e of iterable) {
            if (isIterable(e)) {
                for (let ee of TreeIterable1(e)) {
                    yield ee;
                }
            } else {
                yield e;
            }
        }
    }
});

const Tree = (iterable) =>({
    *[Symbol.iterator] () {
        for (let e of iterable) {
            if (isIterable(e)) {
                yield * Tree(e);
            } else {
                yield e;
            }
        }
    }
});

for (let i of TreeIterable1([1, [2, [3, 4], 5]])) {
    console.log(i);
}

for (let i of Tree([1, [2, [{'a': 44}, 4], 5]])) {
    console.log(i);
}

// better map with
const mapWith2 = (fn, iterable) =>({
    *[Symbol.iterator] () {
        for (let element of iterable) {
            yield fn(element);
        }
    }
});

const plusOne = (x) => (x + 1);
let dummyTree = Tree([1, [2, [4, 4], 5]]);
var addOne = mapWith2(plusOne, dummyTree);
for (let i of addOne) {
    console.log(i)
}

const filterWith2 = (fn, iterable) => ({
    *[Symbol.iterator] () {
        for (let element of iterable) {
            if (!!fn(element)) yield element;
        }
    }
});

const untilWith2 = (fn, iterable) => ({
    *[Symbol.iterator] () {
        for (let element of iterable) {
            if (fn(element)) break;
            yield fn(element);
        }
    }
});

// 1. collections
// 2. map, reduce, filter, find
// 3. more custom methods on the collections(aka class)
// 4. in custom methods we use same functions as in map,
// reduce,filter
// we no need colleciton to handle all details of elements
// we do to bank ask for 300, then teller will print money
// give us the notes


