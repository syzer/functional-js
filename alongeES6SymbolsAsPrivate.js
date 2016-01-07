'use strict';
const Queue = () => ({
    arr: [],
    head: 0,
    tail: -1,
    pushTail (value) {
        return this.arr[this.tail += 1] = value
    },
    pullHead () {
        if (this.tail >= this.head) {
            let value = this[arr][this.head];

            this.arr[this.head] = undefined;
            this.head += 1;
            return value
        }
    },
    isEmpty () {
        return this.tail < this.head
    }
});

let q = Queue();
q.pushTail('hello');
//q.pushTail('symbols');
//
//q.pullHead();
console.log(q);
//{ arr: [ 'hello' ],
//    head: 0,
//    tail: 0,
//    pushTail: Function
//    ..

// We can make them private
const arr = Symbol(),
    head = Symbol(),
    tail = Symbol();

const Queue2 = () => ({
    [arr]: [],
    [head]: 0,
    [tail]: -1,
    pushTail (value) {
        return this.arr[this.tail += 1] = value
    },
    pullHead () {
        if (this.tail >= this.head) {
            let value = this.arr[this.head];

            this.arr[this.head] = undefined;
            this.head += 1;
            return value
        }
    },
    isEmpty () {
        return this.tail < this.head
    }
});

let q2 = Queue2();
console.log(q2);
// arr, head, tail are private, unique, non enurable

// META OBJECTS
// 1. MIXIN
const sam = {
    firstName: 'Sam',
    lastName: 'Lowry'
};

const Person = {
    fullName () {
        return this.firstName + " " + this.lastName;
    },
    rename (first, last) {
        this.firstName = first;
        this.lastName = last;
        return this;
    }
};
Object.assign(sam, Person);
console.log(sam.fullName); //function

const elen = {
    firstName: 'Elen',
    lastName: 'Hunt'
};
Object.assign(elen, Person);

//mixin
const SpellCaster = {
    castSpell () {
        return this.firstName + ' casting spell'
    }
};
Object.assign(sam, Person, SpellCaster);
console.log(sam.castSpell()); // Sam casting spell

// 2. forwarding
function forward(receiver, metaobject, ...methods) {
    methods.forEach(function (methodName) {
        receiver[methodName] = (...args) => metaobject[methodName](...args)
    });

    return receiver;
}
// forward email

//3. delegation
function delegate(receiver, metaobject, ...methods) {
    methods.forEach(function (methodName) {
        receiver[methodName] = (...args) =>
            metaobject[methodName].apply(receiver, args)
    });

    return receiver;
}

const portfolio = (function () {
    const investments = Symbol();

    return {
        [investments]: [],
        addInvestment (investment) {
            this[investments].push(investment);
        },
        netWorth () {
            return this[investments].reduce(
                function (acc, investment) {
                    return acc + investment.value;
                },
                0
            );
        }
    };
})();

const investor = forward({}, portfolio, "addInvestment", "netWorth");

investor.addInvestment({type: "art", value: 1000000});
investor.addInvestment({type: "art", value: 2000000});
console.log(investor.netWorth());

// prototype is open to runtime extension !!!!!!!!
let investor2 = Object.create(Person);
investor2.rename('Lukas', 'Sam');
investor2.fullName(); //{ firstName: 'Lukas', lastName: 'Sam' }

Person.lateBind = () => (console.log('hey im late bounded'));
investor2.lateBind(); //'hey im late bounded'

// mixings are closed for extension!!!!!!!

// console.log will not enumarate via prototype... only object OWN methods!!!!!!

// decorator
const fluent = (methodBody) => function (...args) {
    methodBody.apply(this, args);
    return this;
};

Person.normalMethod = fluent(function (a) {
    this.normalMethod = a;
});

let investor3 = investor2.normalMethod('super?');
console.log(investor3 === investor2); //true

const INCREMENT = 1;

class Dequeue extends Queue {
    constructor() {
        super();
        //Queue.prototype.constructor.call(this)
    }

    size() {
        return this.tail - this.head + 1
    }

    pullTail() {
        if (!this.isEmpty()) {
            let value = this.array[this.tail];
            this.array[this.tail] = void 0;
            this.tail -= 1;
            return value
        }
    }

    pushHead(value) {
        if (this.head === 0) {
            for (let i = this.tail; i >= this.head; --i) {
                this.array[i + 1] = this.array[i]
            }
            this.tail += 1;
            this.head += 1;
        }
        this.array[this.head -= 1] = value
    }
}

let que = new Dequeue();

const maybe = (fn) =>
    function (...args) {
        for (let arg of args) {
            if (arg == null) return arg;
        }
        return method.apply(this, args);
    };

const compose = (a, b) =>
    function (x) {
        return a.call(this, b.call(this, x))
    };

let test = compose(x => x + 1, y => y * y)(10);
console.log(test);  // 101

const requireAll = (fn) => function (...args) {
    if (args.length < fn.length)
        throw new Error('missing required arguments');
    else
        return fn.apply(this, args);
};

const once = (fn) => {
    let invocations = new WeakSet(),
        undefinedContext = Symbol('undefined-context');

    return function (...args) {
        const context = this === undefined
            ? undefinedContext
            : this;
        if (invocations.has(context)) return;
        invocations.add(context);
        return fn.apply(this, args);
    }
};

// function is to make it work with classes
const requiresFinite = (fn) =>
    function (n) {
        if (Number.isFinite(n)) {
            return fn.call(this, n);
        }
        throw "Bad Wolf";
    };

const plus1 = x => x + 1;
plus1(1);
//=> 2

plus1([]); // WTF!!!!!!!!!!
const safePlusOne = requiresFinite(plus1);
safePlusOne(1);
//safePlusOne([]);  // throws

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    diameter() {
        return Math.PI * 2 * this.radius;
    }

    scaleBy(factor) {
        return new Circle(factor * this.radius);
    }
}

// BAM!!
Circle.prototype.scaleBy = requiresFinite(Circle.prototype.scaleBy);

let circle = new Circle(1);
circle.diameter();   //6.28
//circle.scaleBy([]) // throws