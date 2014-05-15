/**
 * Created by syzer on 5/11/2014.
 */

_ = require('underscore');

function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
    if (!_.isNumber(index)) fail('Expected number');
    if (!isIndexed(a)) fail('non indexed type');
    if ((index < 0) || (index > a.lenght - 1)) fail('out of bound');
    return a[index];
}

function second(a) {
    return nth(a, 1);
}
function first(a) {
    return nth(a, 0);
}
console.log(first([0, 1]));
console.log(second([0, 1]));

// comparators
function comparator(pred) {
    return function (x, y) {
        if (truthy(pred(x, y))) {
            return -1;
        } else if (truthy(pred(y, x))) {
            return 1;
        } else {
            return 0;
        }
    }
}

function lessOrEqual(x, y) {
    return x <= y;
}

var array = [100, 1, 0, 10, 1, 2, 1].sort(comparator(lessOrEqual));
console.log(array); // [ 0, 1, 1, 1, 2, 10, 100 ]

function lameCSV(str) {
    return _.reduce(str.split("\n"), function (table, row) {
        table.push(_.map(row.split(","), function (c) {
            return c.trim();
        }));
        return table;
    }, []);
}
var peoples = "name,age,hair\nLukas,35,red\nBob,44,black";
var peopleTable = lameCSV(peoples);
console.log(peopleTable);
var sorted = _.rest(peopleTable).sort();
console.log(sorted);

function selectNames(table) {
    return _.rest(_.map(table, _.first));
}
function selectAges(table) {
    return _.rest(_.map(table, second));
}
function selectHairColor(table) {
    return _.rest(_.map(table, function (row) {
        return nth(row, 2);
    }));
}
var mergeResults = _.zip;

console.log(selectNames(peopleTable));
console.log(selectHairColor(peopleTable));
console.log(mergeResults(selectNames(peopleTable), selectAges(peopleTable)));

function existy(x) {
    return x != null;
}
function truthy(x) {
    return (x !== false) && existy(x);
}
console.log(truthy(0));  //true

function doWhen(cond, action) {
    if (truthy(cond)) {
        return action();
    } else {
        return undefined;
    }
}

function executeIfHasField(target, name) {
    return doWhen(existy(target[name]), function () {
        return _.result(target, name);
    })
}
console.log(executeIfHasField([1, 2, 3], 'reverse'));       // 3,2,1
console.log(executeIfHasField({foo: 42}, 'foo'));         // 42
console.log(executeIfHasField({foo: 42}, 'not there'));   // undefined

var a = [null, undefined, 1, 2, false].map(existy);  // [false, false, true, true, true]
var b = [null, undefined, 1, 2, false].map(truthy);  // [false, false, true, true, false]
console.log(a, b);

_.each(['lukas', 'emily', 'david'], function (word) {             // Lukas
    console.log(word.charAt(0).toUpperCase() + word.substr(1));   // Emily
});                                                             // David

// 99 botles on the wall SONG
function lyricSegment(n) {
    return _.chain([])
        .push(n + ' bottles of beer on the wall')
        .push(n + ' bottles of beer')
        .push('Take one down and pass it around')
        .tap(function (lyrics) {
            if (n > 1) lyrics.push((n - 1) + ' bottles of beer on the wall');
            else lyrics.push('No more bottles of beer on the wall');
        })
        .value();
}
var print = function (what) {
    console.log(what);
};
function song(start, end, lyricGenerator) {
    return _.reduce(_.range(start, end, -1), function (acc, n) {
        return acc.concat(lyricGenerator(n));
    }, []);
}
print(song(4, 0, lyricSegment));
//print(lyricSegment(9));


// MAP REDUCE FILTER
function doubleAll(table) {
    return _.map(table, function (n) {
        return n * 2;
    })
}
print(doubleAll([1, 2, 3, 4, 5]));

function average(table) {
    var sum = _.reduce(table, function (a, b) {
        return a + b
    });
    return sum / _.size(table);
}
print(average([1, 2, 3, 4, 5]));

function onlyEven(table) {
    return _.filter(table, function (n) {
        return (n % 2) === 0;
    })
}
print(onlyEven([1, 2, 3, 4, 5]));

// collection centric access
var mapOverObject = _.map({a: 1, b: 2}, _.identity);
print(mapOverObject);       // [1, 2]

var nums = [100, 2, 25];
function div(x, y) {
    return x / y;
}
print(_.reduce(nums, div));         // 2
print(_.reduceRight(nums, div));    // 0.125

// in scala reduce right has advantage of lazy evaulation !!
function allOff() {
    return _.reduceRight(arguments, function (truth, f) {
        return truth && f();
    }, true);
}
function anyOf() {
    return _.reduceRight(arguments, function (truth, f) {
        return truth || f();
    }, false);
}
function T() {
    return true;
}
function F() {
    return false
}
print(allOff(T, T, T, T, F));       // false
print(allOff(T, T, T, T, T));       // true
print(anyOf(F, T, F, F, F));        // true
print(anyOf(F, F, F, F, F));        // false

// COMPLEMENT, like _reject
var result = _.filter(['a', 'b', 3, 'c'], complement(_.isNumber));
function complement(PRED) {                                 // is like ! = or underscore reject
    return function () {
        return !PRED.apply(null, _.toArray(arguments));
    };
}
print("here", result);  // [ 'a', 'b', 'c' ]

var arrayMix = ['a', 'b', 3, 'c'];
print(_.reject(arrayMix, _.isNumber));  // [a,b,c]
print(_.all(arrayMix, _.isNumber));     // false
print(_.any(arrayMix, _.isString));     // true

var peoples = [
    {name: 'Lukas', age: 30, occupation: 'programmer'},
    {name: 'Rico', age: 5, occupation: 'ferret'},
    {name: 'Jake', age: 22, occupation: 'programmer'}
];
print(_.sortBy(peoples, function (n) {    // sorts by name
    return n.age;
}));

print(_.groupBy(peoples, function (n) { // programmer: [ { name: 'Lukas', age: 30, occupation: 'programmer' },
    return n.occupation;                //              { name: 'Jake', age: 22, occupation: 'programmer' } ],
}));                                    // ferret: [ { name: 'Rico', age: 5, occupation: 'ferret' } ] }

print(_.countBy(peoples, function (n) {  // { programmer: 2, ferret: 1 }
    return n.occupation;
}));

function cat() {
    var head = _.first(arguments);
    if (existy(head)) return head.concat.apply(head, _.rest(arguments));
    else return [];
}
print(cat([1, 2, 3], [4, 5], [6, 7, 8]));   // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
// now fucking lences !!
function construct(head, tail) {
    return cat([head], _.toArray(tail));
}
print(construct(42, [1, 2, 3]));    // [ 42, 1, 2, 3 ]

function mapCat(fun, coll) {        // its better since it recieves it with arguments
    return cat.apply(null, _.map(coll, fun));
}
var mapCatValue = mapCat(function (e) {
    return construct(e, [',']);
}, [1, 2, 3]);
print(mapCatValue);                            // [ 1, ',', 2, ',', 3, ',' ]
function butLast(coll) {
    return _.toArray(coll).slice(0, -1);
}
function interpose(inter, coll) {
    return butLast(mapCat(function (e) {
        return construct(e, [inter]);
    }, coll));
}
print(interpose(',', [1, 2, 3]));              // [ 1, ',', 2, ',', 3 ]

var movies = [
    {title: "Chthon", author: "Anthony"},
    {title: "Grendel", author: "Gardner"},
    {title: "After Dark"}
];
print(_.pluck(movies, 'author'));               // [ 'Anthony', 'Gardner', undefined ]

var zombie = {name: "Bub", film: "Day of the Dead"};
_.keys(zombie);
_.values(zombie);
print(_.invert(zombie));    // { Bub: 'name', 'Day of the Dead': 'film' }
print(_.pairs(zombie));     // [ [ 'name', 'Bub' ], [ 'film', 'Day of the Dead' ] ]

print(    // { NAME: 'Bub', FILM: 'Day of the Dead' }
    _.object(_.map(_.pairs(zombie), function (pair) {
        return [pair[0].toUpperCase(), pair[1]];
    }))
);
print(_.keys(_.invert({a: 138, b: 9}))); // [ '9', '138' ]

print(  // ["Anthony", "Gardner", "Unknown"]
    _.pluck(_.map(movies, function (obj) {
        return _.defaults(obj, {author: "Unknown"})
    }), 'author')
);

var person = {name: "Romy", token: "j3983ij", password: "tigress"};
var info = _.omit(person, 'token', 'password');
var cred = _.pick(person, 'token', 'password');
print(info, cred);                        //=> {name: "Romy"}

// searching in JSON
var library = [
    {title: "SICP", isbn: "0262010771", ed: 1},
    {title: "SICP", isbn: "0262510871", ed: 2},
    {title: "Joy of Clojure", isbn: "1935182641", ed: 1},
    {noTitle: "theres dont have title", isbn: "1935182641", ed: 1}
];
var jsonSearch = _.findWhere(library, {title: "SICP", ed: 2});
print(jsonSearch);   // { title: 'SICP', isbn: '0262510871', ed: 2 }
print(_.where(library, {ed: 2}));   // [ { title: 'SICP', isbn: '0262510871', ed: 2 } ]
print(_.pluck(library, 'title'));

//TODO select
function project(table, keys) {
    return _.map(table, function (obj) {
        return _.pick.apply(null, construct(obj, keys));
    });
}
print(project(library, ['isbn', 'ed']));     // is exacly like SQL select
var isbns = project(library, ['isbn']);     // [ { isbn: '0262010771' }, .. ]
print(isbns);
print(_.pluck(isbns, 'isbn'));              // [ '0262010771', '0262510871', '1935182641' ]

function rename(obj, newNames) {
    return _.reduce(newNames, function (o, nu, old) {
            if (_.has(obj, old)) {
                o[nu] = obj[old];
                return o;
            } else {
                return o;
            }
        },
        _.omit.apply(null, construct(obj, _.keys(newNames))));
}

print(rename({a: 1, b: 2}, {'a': 'AAA'}));  // { b: 2, AAA: 1 }

function as(table, names) {
    return _.map(table, function (obj) {
        return rename(obj, names);
    });
}

print(as(library, {ed: 'edition'})); // [{title: 'SICP', isbn: '0262010771', edition: 1 },...
print(project(as(library, {ed: 'edition'}), ['edition']));  // [ { edition: 1 }, { edition: 2 }, { edition: 1 } ]

// TODO restrict (like WHERE)
function restrict(table, pred) {
    return _.reduce(table, function (newTable, obj) {
        if (truthy(pred(obj)))
            return newTable;
        else
            return _.without(newTable, obj);
    }, table);
}
print(restrict(library, function (book) {       // [ { title: 'SICP', isbn: '0262510871', ed: 2 } ]
    return book.ed > 1;
}));

var editionBiggerThanOne = restrict(        // [ { title: 'SICP', isbn: '0262510871', edition: 2 } ]
    project(
        as(library, {ed: 'edition'}),
        ['title', 'isbn', 'edition']),
    function (book) {
        return book.edition > 1;
    });
print(editionBiggerThanOne);

//TODO EXAM QUESTION ABOUT CLOSUERS
function whatWasTheLocal() {
    var CAPTURED = "Oh hai";
    return function () {
        return "The local was: " + CAPTURED;
    };
}
var reportLocal = whatWasTheLocal();
print(reportLocal());   //=> "The local was: Oh hai"

function createScaleFunction(FACTOR) {
    return function (v) {
        return _.map(v, function (n) {
            return (n * FACTOR);
        });
    };
}
var scale10 = createScaleFunction(10);
print(scale10([1, 2, 3]));   //=> [10, 20, 30]
// TODO 65 tells about shadowing, good interview question

// TODO interview question, closure will hold REFERENCE!!! of captured thing,
function isEven(n) {
    return (n % 2) === 0
}
var isOdd = complement(isEven);
isOdd(413);  // true
//but when we destroy the good behavior
function isEven(n) {
    return false
}
isEven(10);  //false
isOdd(13);   // true, as expected :)
isOdd(12);   // false, because reference changed

// example of really fucked up closure
function showObject(OBJ) {
    return function () {
        return OBJ;
    };
}
var o = {a: 42};
var showO = showObject(o);
showO();        // {a: 42};

// now mindfuck!!!
o.newField = 108;
showO();        // {a: 42, newField: 108};  <-has added shit
// solution is to use golden brackets!!!!!!!!!!

//like underscore plucker
function plucker(FIELD) {
    return function (obj) {
        return (obj && obj[FIELD]);
    };
}
var bestTitle = {title: "Infinite Jest", author: "DFW"};
var getTitle = plucker('title');
print(getTitle(bestTitle));      //Infinite Jest
print(_.filter(library, getTitle)); // filters one without title


var people = [
    {name: "Fred", age: 65},
    {name: "Lucy", age: 36}
];
print(_.max(people, function (p) {
    return p.age
}));

// finder do the same as max, but with injected comparator
function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function (best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);
        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}
print(finder(_.identity, Math.max, [1, 2, 3, 4, 5]));
finder(plucker('age'), Math.max, people); // same as MAX(peope)

finder(plucker('name'),
    function (x, y) {
        return (x.charAt(0) === "L") ? x : y
    },
    people);    //{name: "Lucy", age: 36}

//!!!!!!!!!!
function best(fun, coll) {
    return _.reduce(coll, function (x, y) {
        return fun(x, y) ? x : y
    });
}
print(best(function (x, y) {
    return x > y
}, [1, 2, 3, 4, 5]));

function repeat(times, VALUE) {
    return _.map(_.range(times), function () {
        return VALUE;
    });
}
//TODO times, repeadly
function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}
repeatedly(3, function () {
    return Math.floor((Math.random() * 10) + 1);
});
repeatedly(3, function () {
    return print("Odelay!");
});
var jsdom = require('jsdom');       // fake DOM!!!
var window = jsdom.jsdom().createWindow();
$ = require('jquery')(window);

repeatedly(3, function (n) {
    var id = 'id' + n;
    $('body').append($("<p>Odelay!</p>").attr('id', id));
    return id;
});

//TODO repeat until
function iterateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);
    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }
    return ret;
}
print(iterateUntil(function (n) {
        return n + n
    },
    function (n) {
        return n <= 1024
    },
    1));
print(repeatedly(10, function (exp) {
    return Math.pow(2, exp + 1)
}));

//just a toy
function invoker(NAME, METHOD) {
    return function (target /* args ... */) {
        if (!existy(target)) fail("Must provide a target");
        var targetMethod = target[NAME];
        var args = _.rest(arguments);
        return doWhen((existy(targetMethod) && METHOD === targetMethod), function () {
            return targetMethod.apply(target, args);
        });
    };
}
var rev = invoker('reverse', Array.prototype.reverse);
_.map([
    [1, 2, 3]
], rev);  // [[3,2,1]]

var generator = {
    count: 0,
    uniqueString: function (prefix) {
        return [prefix, this.count++].join('');
    }
};
generator.uniqueString("bohr");
print(generator.uniqueString("bohr"));

// one can owerwrite count in generator, so closure to rescue
var omGenerator = (function (init) {
    var COUNTER = init;
    return {
        uniqueString: function (prefix) {
            return [prefix, COUNTER++].join('');
        }
    };
})(0); // nice?

//TODO guard against null, vs nullObject pattern
function fnull(fun /*, defaults */) {
    var defaults = _.rest(arguments);
    return function (/* args */) {       // its a decorator over function
        var args = _.map(arguments, function (e, i) {
            return existy(e) ? e : defaults[i];
        });
        return fun.apply(null, args);
    };
}
var evilNums = [1, 2, 3, null, 5];
_.reduce(evilNums, function (total, n) {
    return total * n
}); //0, but
var safeMult = fnull(function (total, n) {
    return total * n
}, 1, 1);
print(_.reduce(nums, safeMult));    // 5000!

function defaults(d) {
    return function (o, k) {
        var val = fnull(_.identity, d[k]);
        return o && val(o[k]);
    };
}
function doSomething(config) {
    var lookup = defaults({critical: 108});
    return lookup(config, 'critical');
}

doSomething({critical: 9});    //=> 9
doSomething({});               //=> 108


function always(VALUE) {
    return function () {
        return VALUE;
    };
}

function checker(/* validators */) {
    var validators = _.toArray(arguments);
    return function (obj) {
        return _.reduce(validators, function (errs, check) {
            if (check(obj))
                return errs;
            else
                return _.chain(errs).push(check.message).value();   // mutate and error array
        }, []);
    };
}

var alwaysPasses = checker(always(true), always(true));
alwaysPasses({});           //=> []
var fails = always(false);
fails.message = "a failure in life";
var alwaysFails = checker(fails);
alwaysFails({});            //=> ["a failure in life"]

// TODO validators
function validator(message, fun) {
    var f = function (/* args */) {
        return fun.apply(fun, arguments);
    };
    f['message'] = message;
    return f;
}
var gonnaFail = checker(validator("ZOMG!", always(false)));
gonnaFail(100);             // ["ZOMG!"]

function aMap(obj) {
    return _.isObject(obj);
}
var checkCommand = checker(validator("must be a map", aMap));
checkCommand({});               // true
print(checkCommand(42));        // myst be a map

function hasKeys() {
    var KEYS = _.toArray(arguments);        // existy(obj[k])
    var fun = function (obj) {
        return _.every(KEYS, function (k) {
            return _.has(obj, k);
        });
    };
    fun.message = cat(["Must have values for keys:"], KEYS).join(" ");
    return fun;
}
//TODO awesome functional validator
var checkCommand2 = checker(validator("must be a map", aMap),
    hasKeys('msg', 'type'));
print(checkCommand2(32));
print(checkCommand2({msg: 'blah', type: 'display'}));
print(checkCommand2({}));
