/**
 * Created by syzer on 14/2/23.
 */
function basicFactorial(n) {
    return n === 0 ? 1 : n * basicFactorial(n - 1)
}

function nonRecursive(f) {
    return function (n) {
        return n === 0 ? 1 : n * f(n - 1)
    }
}

nonRecursive(x => {
    return 0
})(100) // => 0
nonRecursive(x => {
    return 1
})(100) // => 100
nonRecursive(x => {
    return 10
})(100) // => 1000

console.log(nonRecursive(x => {
    return 2
})(100))// 200

// but
nonRecursive(basicFactorial)(4) === basicFactorial(4)  // so basic factorial is a fixed point of non recursive
nonRecursive(basicFactorial)(10) === basicFactorial(10)    // so f(xo) = xo
nonRecursive(basicFactorial)(17) === basicFactorial(17)    // what if we dont know the basicFactorial

// would be nice to pass some function to nonRecursive and get it fixed point
// Y(nonRecursive)(100);               // 9.33262154439441e+157
// Y(nonRecursive)(100) === nonRecursive(basicFactorial)(100);
// Y(nonRecursive)(100) === nonRecursive(Y(nonRecursive))(100);    //so we dont need the basic factorial

// so lets try apply function to itself
function nonRecursive2(f) {
    return function (n) {
        return n === 0 ? 1 : n * f(f)(n - 1) // note f(f)
    }
}
const test = nonRecursive2(nonRecursive2)(5) // => 120
console.log(test)

function nonRecursive3(f) {
    return function (x) {
        const g = function (q) {           // lets get shit wrapped in a function g
            return function (n) {
                return n === 0 ? 1 : n * q(n - 1)
            }
        }
        return g(f(f))(x)
    }
}
// since g does not depends on anything in a closure (like x)
function g(f) {             // looks like the nonFactorial a bit?? :)
    return function (n) {
        return n === 0 ? 1 : n * f(n - 1)
    }
}

function almostY(f) {
    return function (x) {
        return g(f(f))(x)          // the Y should not depend from g
    }
}
const test2 = almostY(almostY)(5) // => 120
console.log(test2)

function Y(f) {
    const p = function (h) {       // pulling up p
        return function (x) {
            return f(h(h))(x)
        }
    }
    return p(p)
}
const test3 = Y(g)(6) // => 720
console.log(test3)

function nonRecursiveFibonacci(f) {
    return function (n) {
        return n < 2 ? n : f(n - 1) + f(n - 2)
    }
}
const test4 = Y(nonRecursiveFibonacci)(10) // => 55
console.log('\n', test4)

// ////////////
var Y = function (F) {
    return (function (x) {
        return F(y => {
            return (x(x))(y)
        })
    })(x => {
        return F(y => {
            return (x(x))(y)
        })
    })
}
const FactGen = function (fact) {
    return (function (n) {
        return ((n == 0) ? 1 : (n * fact(n - 1)))
    })
}
const test5 = (Y(FactGen))(6)    // 720
console.log(test5)

// //////////////////
function fib(n) {
    if (n == 0) {
        return 0
    }
    if (n == 1) {
        return 1
    }
    return fib(n - 1) + fib(n - 2)
}

var fib = Y(g => {
    return (function (n) {
        if (n == 0) {
            return 0
        }
        if (n == 1) {
            return 1
        }
        return g(n - 1) + g(n - 2)
    })
})

// Ymem takes a functional and an (optional)
// cache of answers.

// It returns the fixed point of the functional
// that caches intermediate results.

function Ymem(F, cache) {
    if (!cache) {
        cache = {}
    } // Create a new cache.
    return function (arg) {
        if (cache[arg]) {
            return cache[arg]
        } // Answer in cache.
        const answer = (F(n => {
            return (Ymem(F, cache))(n)
        }))(arg) // Compute the answer.
        cache[arg] = answer // Cache the answer.
        return answer
    }
}

var fib = Ymem(g => {
    return (function (n) {
        if (n == 0) {
            return 0
        }
        if (n == 1) {
            return 1
        }
        return g(n - 1) + g(n - 2)
    })
})
console.log(fib(100))

/*
 1.Ymem only works on functions of one argument, but this could be remedied with
 JS apply method and the use of a trie-like cache.

 2.Ymem only works for indexable argument values like numbers and strings,
 but this can be circumvented by supplying a comparator on argument values,
 so that it can use a sorted tree for the cache.
 */
