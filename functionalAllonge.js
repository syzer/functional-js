/**
 * Created by syzer on 5/26/2014.
 */
const allonge = require('allong.es')
const variadic = allonge.es.variadic
const iterators = allonge.es.iterators
var maybe = allonge.es.maybe
const bilby = require('bilby')
// var flip = allonge.es.flip;
// var flip = bilby.flip;
const curry = allonge.es.curry
// var iterators = require('allong.es').iterators;
console.log(iterators)
// var bound = allonge.es.bound;

let take = iterators.take,
    map = iterators.map,
    drop = iterators.drop

const ints = iterators.numbers()
const squares = take(drop(map(ints, n => {
    return n * n
}), 100000), 100)
// defered computatnion till:

const coll = []
for (let i = 0; i < 10; i++) {
    coll.push(squares())
}
Object.prototype.log = function (stringInj) {
    const string = stringInj || ''
    console.log(string, this)
    return this
}
console.log(coll)  // fuck! NAN TODO
const contextualize = function (fn, context) {
    return function () {
        return fn.apply(context, arguments)
    }
}
const a = [1, 2, 3]
const accrete = contextualize(a.concat, a)
accrete([4, 5]).log()

let someObject = {},
    someDomField = {on() {
    }}
someObject.setSomeValue = (function () {
    const unboundMethod = someObject.setSomeValue
    return function (value) {
        return unboundMethod.call(someObject, value)
    }
})()
function someMehtod() {
}
someDomField.on('update', someObject.setSomeValue)
const _ = require('underscore')
// _.bindAll(someObject);
_.bindAll(someObject, 'setSomeValue')

function add(verb, a, b) {
    return 'The ' + verb + ' of ' + a + ' and ' + b + ' is ' + (a + b)
}
// TODO partial application
var callLeft = variadic((fn, args) => {
    return variadic(function (remainingArgs) {
        return fn.apply(this, args.concat(remainingArgs))
    })
})
const sumFive = callLeft(add, 'sum', 5)
console.log(sumFive(6))
const totalSix = add.bind(null, 'total', 6)
console.log(totalSix(5))// .join('');

// TODO curry
function addCurried(verb) {
    return function (a) {
        return function (b) {
            return 'The ' + verb + ' of ' + a + ' and ' + b + ' is ' + (a + b)
        }
    }
}
addCurried('total')(6)(5).log()

const __slice = Array.prototype.slice
function callFirst(fn, larg) {
    return function () {
        const args = __slice.call(arguments, 0)
        return fn.apply(this, [larg].concat(args))
    }
}
function curryTwo(fn) {
    return function (x) {
        return callFirst(fn, x)
    }
}
function add2(a, b) {
    return a + b
}
curryTwo(add)(5)(6)
function curryThree(fn) {
    return function (x) {
        return curryTwo(callFirst(fn, x))
    }
}
curryThree(add)('sum')(5)(6);   // 11

// when native version is avaible
[1, 2, 3, 4, 5].map(n => {
    return n * n
}).log()

// underscore
_([1, 2, 3, 4, 5]).map(n => {
    return n * n
}).log()

function mapWith(fn) {
    return function (list) {
        return Array.prototype.map.call(list, function (something) {
            return fn.call(this, something)
        })
    }
}

const squareMap = mapWith(n => {
    return n * n
})
squareMap([1, 2, 3, 4])

function getWith(attr) {
    return function (object) {
        return object[attr]
    }
}
const inventory = {
    apples: 0,
    oranges: 144,
    eggs: 36
}
getWith('oranges')(inventory).log()
const inventories = [
    {apples: 0, oranges: 144, eggs: 36},
    {apples: 240, oranges: 54, eggs: 12},
    {apples: 24, oranges: 12, eggs: 42}
]
mapWith(getWith('oranges'))(inventories).log()         // 144, 54, 12
mapWith(maybe(getWith('oranges')))(inventories).log()  // 144, 54, 12

// TODO this is B combinator - function that takes only functions
function compose(a, b) {
    return function (c) {
        return a(b(c))
    }
}
function addOne(n) {
    return n + 1
}
function double(n) {
    return n * 2
}
function doubleOfAddOne(n) {
    return double(addOne(n))
}
// or use combinator
var doubleOfAddOne = compose(double, addOne)
console.log(doubleOfAddOne(5)) // 12

// TODO this is most stupid DECORATOR
function not(fn) {
    return function (argument) {
        return !fn(argument)
    }
}

const something = {some: 'thing'}
const nothing = not(something)

function howMany() {
    return [arguments.length]
}
const p = console.log
p(howMany())                   // [0]
howMany('saas', 'sadasd').log() // [2]

// WTF in JS( when functiuon takes 2 arguments
const numbers = [1, 2, 3, 4]
numbers.map(parseFloat).log()
numbers.map(parseInt).log()        // 1, NaN, NaN, NaN
const unary = function unary(fn) {
    if (fn.length == 1) {
        return fn
    } else {
        return function (something) {
            return fn.call(this, something)
        }
    }
}
numbers.map(unary(parseInt)).log() // 1,2,3,4

// TODO K combinator
function K(x) {
    return function (y) {
        return x
    }
}

// when passed function execute.. else return value,
// this is curried version
function tap(value) {
    return function (fn) {
        if (typeof (fn) === 'function') {
            fn(value)
        }
        return value
    }
}

const drink = tap('espresso')(it => {
    p('The drink is', it)                   // drink is esspresso
})
const drink2 = tap('espresso')() // nothing since we didnt pass function

// cuyrried and uncurried
function tap(value, fn) {
    if (fn === void 0) {
        return curried
    } else {
        return curried(fn)
    }

    function curried(fn) {
        if (typeof (fn) === 'function') {
            fn(value)
        }
        return value
    }
}
const drink3 = tap('espresso', it => {
    p('The drink3 is', it)                   // drink is esspresso
})
const drink4 = tap('espresso')(it => {
    p('The drink4 is', it)                   // drink is esspresso
})
const drink5 = tap('espresso')()              // nothing
const drink6 = tap('espresso', null)          // nothing

// TODO maybe monad
function maybe(fn) {
    return function () {
        let i

        if (arguments.length === 0) {
            return
        } else {
            for (i = 0; i < arguments.length; ++i) {
                if (arguments[i] == null) {
                    return
                }
            }
            return fn.apply(this, arguments)
        }
    }
}
function maybeOneParameter(fn) {
    return function (argument) {
        if (argument !== null) {
            return fn.call(this, argument)  // fn(argument) dont preserve context
        }
    }
}

function Model() {
}
Model.prototype.setSomething = maybe(function (value) {
    this.something = value
})

function once(fn) {
    let done = false
    return function () {
        if (done) {
            return void 0
        } else {
            done = true
            fn.apply(this, arguments)
        }
    }
}

const askedOnBlindDate = once(() => {
    p('sure, why not??')
})

askedOnBlindDate() // prints
askedOnBlindDate() // udentified
askedOnBlindDate() // udentified

// flip arguments
function flip(fn) {
    return function (first, second) {
        if (arguments.length === 2) {
            return fn.call(this, second, first)
        }
        return function (second) {
            return fn.call(this, second, first)
        }
    }
}

const extend = variadic((consumer, providers) => {
    let key,
        i,
        provider

    for (i = 0; i < providers.length; ++i) {
        provider = providers[i]
        for (key in provider) {
            if (provider.hasOwnProperty(key)) {
                consumer[key] = provider[key]
            }
        }
    }
    return consumer
})

const shipment = {apples: 44, bananas: 22}
const shipment2 = {oranges: 66, mangos: 33}
extend(shipment, shipment2).log()      // { apples: 44, bananas: 22, oranges: 66, mangos: 33 }

function Y(fn) {
    const f = function (f) {
        return function () {
            return fn.apply(f, arguments)
        }
    }

    return ((function (x) {
        return f(v => {
            return x(x)(v)
        })
    })(x => {
        return f(v => {
            return x(x)(v)
        })
    }))
}

const stupidFactorial = function (n) {
    return (n === 0 ? 1 : n * this(n - 1))
}
const YFactorial = Y(stupidFactorial)
p(YFactorial(101))

// cannonical
function Y2(f) {
    return ((function (x) {
        return f(v => {
            return x(x)(v)
        })
    })(x => {
        return f(v => {
            return x(x)(v)
        })
    }))
}
const Yfactorial2 = Y2(fac => {
    return function (n) {
        return (n == 0 ? 1 : n * fac(n - 1))
    }
})
p(Yfactorial2(101))

const fibonacci = function (n) {
    if (n < 2) {
        return n
    }
    return fibonacci(n - 2) + fibonacci(n - 1)
}
s = (new Date()).getTime()
p(fibonacci(37))
p(((new Date()).getTime() - s) / 1000 + ' s')

function memoized(fn, keymaker) {
    let lookupTable = {},
        key

    keymaker || (keymaker = function (args) {
        return JSON.stringify(args)
    })

    return function () {
        const key = keymaker.call(this, arguments)

        return lookupTable[key] || (
            lookupTable[key] = fn.apply(this, arguments)
            )
    }
}
const fastFibonacci = memoized(n => {
    if (n < 2) {
        return n
    }
    return fastFibonacci(n - 2) + fastFibonacci(n - 1)
})
s = (new Date()).getTime()
p(fastFibonacci(37))           // 0s!!! faster
p(((new Date()).getTime() - s) / 1000 + ' s')

const pluckWith = compose(mapWith, getWith)
pluckWith('eggs')(inventories).log()   // [ 36, 12, 42 ]
_.pluck(inventories, 'eggs').log()     // [ 36, 12, 42 ]
const plukWith = flip(_.pluck)
pluckWith('eggs')(inventories).log()   // [ 36, 12, 42 ]

function deepMapWith(fn) {
    return function innerdeepMapWith(tree) {
        return Array.prototype.map.call(tree, element => {
            if (Array.isArray(element)) {
                return innerdeepMapWith(element)
            } else {
                return fn(element)
            }
        })
    }
}
const report = [
    [
        {price: 7.99, id: 221},
        {price: 6.99, id: 222}
    ],
    [
        {price: 5.99, id: 223},
        {price: 3.99, id: 224}
    ]
]
// TODO for nested structures
deepMapWith(getWith('price'))(report).log()

function sumOfFour(a, b, c, d) {
    return a + b + c + d
}
const curried = curry(sumOfFour)
p(curried(1)(2)(3)(4))
p(curried(1, 2)(3, 4))

function callLeft(fn) {
    return curry(fn).apply(null, __slice.call(arguments, 1))
}
p(callLeft(sumOfFour, 1)(2, 3, 4))

const bound = allonge.es.bound
const send = variadic((methodName, leftArguments) => {
    return variadic((receiver, rightArguments) => {
        return receiver[methodName].apply(
            receiver, leftArguments.concat(rightArguments)
        )
    })
})
// var objRepo = [[{apples:66}, {oranges:66}]];
// mapWith(send('apples'))(inventories);

// TODO fluent API decorator!!!!
function fluent(methodBody) {
    return function () {
        methodBody.apply(this, arguments)
        return this
    }
}

function Cake() {
}
Cake.prototype.setTopping = fluent(function (topping) {
    console.log('Applied tooping: ' + topping)
    this.topping = topping
})
// return this
Cake.prototype.bake = fluent(function (cookie) {
    console.log('baked this cookie')
    this.baked = true
})
const cake = new Cake().setTopping('chocolate').bake()
p(cake)

const setter = compose(fluent, maybe)        // fluent(maybe)
Cake.prototype.setUser = setter(function (user) {
    this.user = user
})
cake.setUser('lukas').setUser().log()  // maybe will help

// TODO pipeline
const pipeline = flip(compose)

// TODO this use u can call with and without new!!!
function User(name, password) {
    if (!(this instanceof User)) {
        return new User(name, password)
    }
    this.name = name || 'Untitled'
    this.password = password
}

function User2(name, password) {
    const self = this instanceof User ? this : new User()
    self.name = name || ''
    self.password = password || 'alamakota'
}

// TODO mixin
const ColourCoded = {
    setColourRGB: fluent(function (r, g, b) {
        this.colourCode = {r, g, b}
    }),
    getColourRGB() {
        return this.colourCode
    }
}

extend(User.prototype, ColourCoded)
User.prototype.log()
