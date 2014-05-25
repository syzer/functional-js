/**
 * Created by syzer on 5/11/2014.
 */
'use strict';

var _ = require('underscore');

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
    return _.reduce(str.split('\n'), function (table, row) {
        table.push(_.map(row.split(','), function (c) {
            return c.trim();
        }));
        return table;
    }, []);
}
var peoples = 'name,age,hair\nLukas,35,red\nBob,44,black';
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

// 99 bottles on the wall SONG
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
print('here', result);  // [ 'a', 'b', 'c' ]

var arrayMix = ['a', 'b', 3, 'c'];
print(_.reject(arrayMix, _.isNumber));  // [a,b,c]
print(_.all(arrayMix, _.isNumber));     // false
print(_.any(arrayMix, _.isString));     // true

var peoplesArr = [
    {name: 'Lukas', age: 30, occupation: 'programmer'},
    {name: 'Rico', age: 5, occupation: 'ferret'},
    {name: 'Jake', age: 22, occupation: 'programmer'}
];
print(_.sortBy(peoplesArr, function (n) {    // sorts by name
    return n.age;
}));

print(_.groupBy(peoplesArr, function (n) { // programmer: [ { name: 'Lukas', age: 30, occupation: 'programmer' },
    return n.occupation;                //              { name: 'Jake', age: 22, occupation: 'programmer' } ],
}));                                    // ferret: [ { name: 'Rico', age: 5, occupation: 'ferret' } ] }

print(_.countBy(peoplesArr, function (n) {  // { programmer: 2, ferret: 1 }
    return n.occupation;
}));

// concatinate data structure
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
    {title: 'Chthon', author: 'Anthony'},
    {title: 'Grendel', author: 'Gardner'},
    {title: 'After Dark'}
];
print(_.pluck(movies, 'author'));               // [ 'Anthony', 'Gardner', undefined ]

var zombie = {name: 'Bub', film: 'Day of the Dead'};
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

print(  // ['Anthony', 'Gardner', 'Unknown']
    _.pluck(_.map(movies, function (obj) {
        return _.defaults(obj, {author: 'Unknown'})
    }), 'author')
);

var person = {name: 'Romy', token: 'j3983ij', password: 'tigress'};
var info = _.omit(person, 'token', 'password');
var cred = _.pick(person, 'token', 'password');
print(info, cred);                        //=> {name: 'Romy'}

// searching in JSON
var library = [
    {title: 'SICP', isbn: '0262010771', ed: 1},
    {title: 'SICP', isbn: '0262510871', ed: 2},
    {title: 'Joy of Clojure', isbn: '1935182641', ed: 1},
    {noTitle: 'theres dont have title', isbn: '1935182641', ed: 1}
];
var jsonSearch = _.findWhere(library, {title: 'SICP', ed: 2});
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
    var CAPTURED = 'Oh hai';
    return function () {
        return 'The local was: ' + CAPTURED;
    };
}
var reportLocal = whatWasTheLocal();
print(reportLocal());   //=> 'The local was: Oh hai'

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
function isEven(n) {        // evil version
    return false
}
isEven(10);  //false
isOdd(13);   // true, as expected :)
isOdd(12);   // false, because reference changed

function isEven(n) {        // reset back
    return (n % 2) === 0
};

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
var bestTitle = {title: 'Infinite Jest', author: 'DFW'};
var getTitle = plucker('title');
print(getTitle(bestTitle));      //Infinite Jest
print(_.filter(library, getTitle)); // filters one without title


var people = [
    {name: 'Fred', age: 65},
    {name: 'Lucy', age: 36}
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
        return (x.charAt(0) === 'L') ? x : y
    },
    people);    //{name: 'Lucy', age: 36}

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
    return print('Odelay!');
});
var jsdom = require('jsdom');       // fake DOM!!!
var window = jsdom.jsdom().createWindow();
var $ = require('jquery')(window);

repeatedly(3, function (n) {
    var id = 'id' + n;
    $('body').append($('<p>Odelay!</p>').attr('id', id));
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
        if (!existy(target)) fail('Must provide a target');
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
generator.uniqueString('bohr');
print(generator.uniqueString('bohr'));

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
fails.message = 'a failure in life';
var alwaysFails = checker(fails);
alwaysFails({});            //=> ['a failure in life']

// TODO validators
function validator(message, fun) {
    var f = function (/* args */) {
        return fun.apply(fun, arguments);
    };
    f['message'] = message;
    return f;
}
var gonnaFail = checker(validator('ZOMG!', always(false)));
gonnaFail(100);             // ['ZOMG!']

function aMap(obj) {
    return _.isObject(obj);
}
var checkCommand = checker(validator('must be a map', aMap));
checkCommand({});               // true
print(checkCommand(42));        // must be a map

function hasKeys() {
    var KEYS = _.toArray(arguments);        // existy(obj[k])
    var fun = function (obj) {
        return _.every(KEYS, function (k) {
            return _.has(obj, k);
        });
    };
    fun.message = cat(['Must have values for keys:'], KEYS).join(' ');
    return fun;
}

//TODO awesome functional validator
var checkCommand2 = checker(validator('must be a map', aMap),
    hasKeys('msg', 'type'));
print(checkCommand2(32));
print(checkCommand2({msg: 'blah', type: 'display'}));
print(checkCommand2({}));

// maybe rewrite, run functions till finds defined function(non-udentified)
function dispatch(/* funs */) {
    var funs = _.toArray(arguments);
    var size = funs.length;
    return function (target /*, args */) {
        var ret = undefined;
        var args = _.rest(arguments);
        for (var funIndex = 0; funIndex < size; funIndex++) {
            var fun = funs[funIndex];
            ret = fun.apply(fun, construct(target, args));
            if (existy(ret)) return ret;
        }
        return ret;
    };
}

// call to string or object/string
var str = dispatch(
    invoker('toString', Array.prototype.toString),
    invoker('toString', String.prototype.toString)
);

print(str('string'));
print(str(_.range(10)));
print(str({})); // undefined

function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join('');
}
print(stringReverse('abc'));

var sillyReverse = dispatch(rev, always(42)); //:)
print(sillyReverse({}));            // 42  : fuck ifs~!!!

//always 42 is a guard
var notify = print;
var changeView = print;
var shutdown = print;

// static factory we will remove this switch
function performCommandHardcoded(command) {
    var result;
    switch (command.type) {
        case 'notify':
            result = notify(command.message);
            break;
        case 'join':
            result = changeView(command.target);
            break;
        default:
            print('alerting ' + command.type);
    }
    return result;
}

performCommandHardcoded({type: 'notify', message: 'hi!'});
performCommandHardcoded({type: 'join', target: 'waiting-room'});
performCommandHardcoded({type: 'wat'});

function isa(type, action) {
    return function (obj) {
        if (type === obj.type)
            return action(obj);     // returns undefined on unmatched
    }
}
var performCommand = dispatch(
    isa('notify', function (obj) {
        return notify(obj.message)
    }),
    isa('join', function (obj) {
        return changeView(obj.target)
    }),
    function (obj) {                // guard
        print('Alerting ' + obj.type)
    }
);

var performAdminCommand = dispatch(
    isa('kill', function (obj) {
        return shutdown(obj.hostname)
    }),
    performCommand
);
performAdminCommand({type: 'kill', hostname: 'localhost'});
performAdminCommand({type: 'join', target: 'foo'}); // do same as normal user

var performTrialUserCommand = dispatch(
    isa('join', function (obj) {
        print('Alert Cannot join until approved!!')
    }),
    performCommand
);
print('----trial user----');
performTrialUserCommand({type: 'join', target: 'foo'}); //
performTrialUserCommand({type: 'notify', message: 'Hi new user'});  // like normal user

// TODO currying, like yield [], wait till all are resolved
function rightAwayInvoker() {
    var args = _.toArray(arguments);
    var method = args.shift();
    var target = args.shift();
    return method.apply(target, args);      // wait till all arguments can be resolved
}
print(rightAwayInvoker(Array.prototype.reverse, [1, 2, 3]));
invoker('reverse', Array.prototype.reverse)([1, 2, 3]);

// theres a difference between left and right reduce/curry
function leftCurryDiv(n) {
    return function (d) {
        return n / d;
    };
}
function rightCurryDiv(d) {
    return function (n) {
        return n / d;
    };
}
var divide10By = leftCurryDiv(10);
print(divide10By(2));                       // 5

var divideBy10 = rightCurryDiv(10);
print(divideBy10(2));                       // 0.2

function curry(fun) {               // take a function
    return function (arg) {          // return function expecting one parameter
        return fun(arg);
    };
}

print(['11', '11', '11', '11'].map(parseInt));     // [ 11, NaN, 3, 4 ] WTF:??
//explanation
print(parseInt('11', 2));                       // 3
print(['11', '11', '11', '11'].map(curry(parseInt)));  //[11,11..]

// curry 2 functions
function curry2(fun) {
    return function (secondArg) {
        return function (firstArg) {
            return fun(firstArg, secondArg);
        };
    };
}
var div10 = curry2(div)(10);
print(div10(50));   //5

var parseBinaryString = curry2(parseInt)(2);
parseBinaryString('111');
print(parseBinaryString('110'));

var plays = [
    {artist: 'Burial', track: 'Archangel'},
    {artist: 'Ben Frost', track: 'Stomp'},
    {artist: 'Ben Frost', track: 'Stomp'},
    {artist: 'Burial', track: 'Archangel'},
    {artist: 'Emeralds', track: 'Snores'},
    {artist: 'Burial', track: 'Archangel'}
];
Object.prototype.info = function (stringInj) {
    var string = stringInj || '';
    console.log(string, this);
};
_.countBy(plays, function (song) {
    return [song.artist, song.track].join(' - ');
}).info();

function songToString(song) {
    return [song.artist, song.track].join(' - ');
}

//TODO compositions of functions using curry
var songCount = curry2(_.countBy)(songToString);
songCount(plays).info();
function songFirstLetters(song) {
    return song.artist.slice(0, 3);
}
var songWeirdCount = curry2(_.countBy)(songFirstLetters);
songWeirdCount(plays).info();   //{ Bur: 3, Ben: 2, Eme: 1}

function curry3(fun) {
    return function (last) {
        return function (middle) {
            return function (first) {
                return fun(first, middle, last);
            };
        };
    };
}
var songsPlayed = curry3(_.uniq)(false)(songToString);  // with unique
songsPlayed(plays).info();

//TODO count colors rgb
function toHex(n) {
    var hex = n.toString(16);
    return (hex.length < 2) ? [0, hex].join('') : hex;
}
function rgbToHexString(r, g, b) {
    return ['#', toHex(r), toHex(g), toHex(b)].join('');
}
rgbToHexString(255, 255, 255).info();
var blueGreenish = curry3(rgbToHexString)(255)(200);
blueGreenish(0).info();

//TODO curry to provide Fluent API
var greaterThan = curry2(function (lhs, rhs) {
    return lhs > rhs
});
var lessThan = curry2(function (lhs, rhs) {
    return lhs < rhs
});

//TODO validator -> best example with curring
var withinRange = checker(
    validator('arg must be greater than 10', greaterThan(10)),      // awesome shit!!!
    validator('arg must be less than 20', lessThan(20))
);
withinRange(15).info();             // []
withinRange(1).info();
withinRange(100).info();

//TODO partial application
function divPart(n) {
    return function (d) {
        return n / d;
    };
}
var over10Part = divPart(10);
over10Part(2).info();               // 5

function partial1(fun, arg1) {
    return function (/* args */) {
        var args = construct(arg1, arguments);
        return fun.apply(fun, args);        // or call/bind
    };
}
var over10Part1 = partial1(div, 10);
over10Part1(5).info();            // 2

function partial2(fun, arg1, arg2) {
    return function (/* args */) {
        var args = cat([arg1, arg2], arguments);
        return fun.apply(fun, args);
    };
}
var div10By2 = partial2(div, 10, 2);
div10By2().info();              // 5

function partial(fun /*, pargs */) {
    var pargs = _.rest(arguments);
    return function (/* arguments */) {
        var args = cat(pargs, _.toArray(arguments));
        return fun.apply(fun, args);
    };
}

var div10By2By4By5000Partial = partial(div, 10, 2, 4, 5000);
div10By2By4By5000Partial().info();

validator('arg must be a map', aMap)(42).info();
var zero = validator('cannot be zero', function (n) {
    return 0 === n
});
var number = validator('arg must be a number', _.isNumber);

function sqr(n) {
    if (!number(n)) throw new Error(number.message);
    if (zero(n)) throw new Error(zero.message);
    return n * n;
}

sqr(10).info();
//sqr(0).info();           // cannot be zerro
//sqr('').info();         // must be a number


//TODO validator precondition
function condition1(/* validators */) {
    var validators = _.toArray(arguments);
    return function (fun, arg) {
        var errors = mapCat(function (isValid) {
            return isValid(arg) ? [] : [isValid.message];
        }, validators);
        if (!_.isEmpty(errors))
            throw new Error(errors.join(', '));
        return fun(arg);
    };
}
var sqrPre = condition1(
    validator('arg must not be zero', complement(zero)),
    validator('arg must be a number', _.isNumber)
);
sqrPre(_.identity, 10).info();
try {
    sqrPre(_.identity, 0)
} catch (e) {
    console.log(e);
}
function uncheckedSqr(n) {
    return n * n
}
uncheckedSqr('').info();            // 0 wich is NOT TRUE bu all means!

var checkedSqr = partial1(sqrPre, uncheckedSqr);
checkedSqr(10).info();
try {
    checkedSqr('');
} catch (e) {
    console.log(e);         // must be a number
}

var sillySquare = partial1(
    condition1(validator('should be even', isEven)),
    checkedSqr
);
function tryCatch(fun) {
    try {
        fun();
    } catch (e) {
        console.log(e);
    }
}
try {
    sillySquare(11);            // [Error: should be even]
} catch (e) {
    console.log(e);
}

var validateCommand = condition1(
    validator('arg must be a map', _.isObject),
    validator('arg must have the correct keys', hasKeys('msg', 'type'))
);
var createCommand = partial(validateCommand, _.identity);

// ussage
createCommand({msg: '', type: ''});
try {
    createCommand(21)
} catch (e) {
    e.info()
}


var createLaunchCommand = partial1(
    condition1(
        validator('arg must have the count down', hasKeys('countDown'))),
    createCommand
);
createCommand({msg: '', type: '', countDown: 10}).info();   //{ msg: '', type: '', countDown: 10 }
// but with any that has not a countdown will throw an error

//TODO COMPOSE
function isntString1(str) {
    return !_.isString(str);
}
var isntString2 = _.compose(function (x) {
    return !x
}, _.isString);

function not(x) {
    return !x
}
var isntString = _.compose(not, _.isString);
isntString([]).info();      // true

function splat(fun) {
    return function (array) {
        return fun.apply(null, array);
    };
}
function unsplat(fun) {
    return function () {
        return fun.call(null, _.toArray(arguments));
    };
}
var composedMapcat = _.compose(splat(cat), _.map);
composedMapcat([
    [1, 2],
    [3, 4],
    [5]
], _.identity).info();

// TODO validators post condiitions
var sqrPost = condition1(
    validator('result should be a number', _.isNumber),
    validator('result should not be zero', complement(zero)),
    validator('result should be positive', greaterThan(0))
);
// TODO this is also a decorator
var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);

try {
    sqrPost(_.identity, '');    // [Error: result should be a number, result should be positive]
} catch (e) {
    console.log(e);
}
megaCheckedSqr(10);
try {
    megaCheckedSqr(NaN);
} catch (e) {
    console.log(e);
}

// TODO recursion
function myLength(ary) {
    if (_.isEmpty(ary))
        return 0;
    else
        return 1 + myLength(_.rest(ary));
}
myLength(_.range(1000)).info();                     // 1000

function cycle(times, ary) {
    if (times <= 0)
        return [];
    else
        return cat(ary, cycle(times - 1, ary));
}
cycle(2, [1, 2, 3]).info();                       // [ 1, 2, 3, 1, 2, 3 ]
_.take(cycle(20, [1, 2, 3]), 11).info();          // [ 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2 ]

function constructPair(pair, rests) {
    return [
        construct(_.first(pair), _.first(rests)),
        construct(second(pair), second(rests))
    ];
}
constructPair(['a', 1],
    [
        [],
        []
    ]).info();               //=> [['a'], [1]]
_.zip(['a'], [1]).info();                              //=> [['a', 1]]
_.zip.apply(null, constructPair(['a', 1], [
    [],
    []
])).info();   //=> [['a', 1]]

constructPair(['a', 1],
    constructPair(['b', 2],
        constructPair(['c', 3], [
            [],
            []
        ]))).info();


function unzip(pairs) {
    if (_.isEmpty(pairs)) return [
        [],
        []
    ];
    return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}
unzip(_.zip([1, 2, 3], [4, 5, 6])).info();  // should give the input

//TODO graphs and recursion
var influences = [
    ['Lisp', 'Smalltalk'],
    ['Lisp', 'Scheme'],
    ['Smalltalk', 'Self'],
    ['Scheme', 'JavaScript'],
    ['Scheme', 'Lua'],
    ['Self', 'Lua'],
    ['Self', 'JavaScript']
];

function nexts(graph, node) {
    if (_.isEmpty(graph)) return [];
    var pair = _.first(graph);
    var from = _.first(pair);
    var to = second(pair);
    var more = _.rest(graph);
    if (_.isEqual(node, from))
        return construct(to, nexts(more, node));
    else
        return nexts(more, node);
}
nexts(influences, 'Lisp').info();       // [ 'Smalltalk', 'Scheme' ]
nexts(influences, 'Scheme').info();       // [ 'Javasript', 'Lua' ]

function depthSearch(graph, nodes, seen) {
    if (_.isEmpty(nodes)) return rev(seen);     // seen as accumulator/cache
    var node = _.first(nodes);
    var more = _.rest(nodes);
    if (_.contains(seen, node))
        return depthSearch(graph, more, seen);
    else
        return depthSearch(
            graph,
            cat(nexts(graph, node), more),
            construct(node, seen)
        );
}
depthSearch(influences, ['Lisp'], []).info();       // [ 'Lisp', 'Smalltalk', 'Self', 'Lua', 'JavaScript', 'Scheme' ]
depthSearch(influences, ['Smalltalk', 'Self'], []).info();  // [ 'Smalltalk', 'Self', 'Lua', 'JavaScript' ]

// TODO tail call recursion
function tcLength(ary, n) {
    var l = n ? n : 0;
    if (_.isEmpty(ary))
        return l;
    return tcLength(_.rest(ary), l + 1);    // last call its just a call , can be obmited on last execution
}
tcLength(_.range(10)).info();                   // 10

// TODO combinators: orify, andify
function andify(/* preds */) {
    var preds = _.toArray(arguments);
    return function (/* args */) {              // nested function to hide accumulator in recursive call
        var args = _.toArray(arguments);
        var everything = function (ps, truth) {
            if (_.isEmpty(ps))
                return truth;

            return _.every(args, _.first(ps))
                && everything(_.rest(ps), truth);   // lazy &&
        };
        return everything(preds, true);
    };
}

var evenNums = andify(_.isNumber, isEven);
evenNums(1, 2, 4, 6, 8, 9).info();          // false
evenNums(2, 4, 6, 8).info();                // true

function orify(/* preds */) {
    var preds = _.toArray(arguments);
    return function (/* args */) {
        var args = _.toArray(arguments);
        var something = function (ps, truth) {
            if (_.isEmpty(ps))
                return truth;

            return _.some(args, _.first(ps))
                || something(_.rest(ps), truth);
        };
        return something(preds, false);
    };
}

var zeroOrOdd = orify(isOdd, zero);
zeroOrOdd().info();                     // false
zeroOrOdd(0, 2, 4, 6).info();              // true


// TODO codependent functions - fun call other function that call back caller

function flat(array) {
    if (_.isArray(array))
        return cat.apply(cat, _.map(array, flat));
    return [array];
}

flat([
    [1, 2],
    [3, 4]
]).info();                                      // 1,2,3,4
flat([
    [1, 2],
    [3, 4, [5, 6, [
        [
            [7]
        ]
    ], 8]]
]).info();     // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

var x = [
    {a: [1, 2, 3], b: 42},
    {c: {d: []}}
];
var y = _.clone(x);
y.info();                                       // clone
x[1]['c']['d'] = 10000;
y.info();                                       //  [ { a: [ 1, 2, 3 ], b: 42 }, { c: { d: 10000 } } ]
_.isEqual(x, y).info('clone :');                // TRUE !!!, he changed the x also!

function deepClone(obj) {
    if (!existy(obj) || !_.isObject(obj))
        return obj;
    var temp = new obj.constructor();
    for (var key in obj)
        if (obj.hasOwnProperty(key))
            temp[key] = deepClone(obj[key]);
    return temp;
}

var y = deepClone(x);
_.isEqual(x, y);
y[1]['c']['d'] = 42;
_.isEqual(x, y).info();                         // false,!!!

// traversing big arrays
//doSomethingWithResult(_.map(someArray, someFun));
function visit(mapFun, resultFun, array) {
    if (_.isArray(array))
        return resultFun(_.map(array, mapFun));
    else
        return resultFun(array);
}
visit(_.identity, _.isNumber, 42).info();       // true
visit(_.isNumber, _.identity, [1, 2, null, 3]); // t,t,f,t
visit(function (n) {
    return n * 2
}, rev, _.range(10)).info();

function postDepth(fun, ary) {  // after expanding children, like JSON parse revive
    return visit(partial1(postDepth, fun), fun, ary);
}
function preDepth(fun, ary) {
    return visit(partial1(preDepth, fun), fun, fun(ary));
}
postDepth(_.identity, influences).info();

// TODO strategy
function influencedWithStrategy(strategy, lang, graph) {
    var results = [];
    strategy(function (x) {
        if (_.isArray(x) && _.first(x) === lang)        // hidden mutation
            results.push(second(x));
        return x;
    }, graph);
    return results;
}
influencedWithStrategy(postDepth, "Lisp", influences).info();   // ['Smalltalk', 'Scheme']
// or better use high order functions
var groupFrom = curry2(_.groupBy)(_.first);
var groupTo = curry2(_.groupBy)(second);
groupFrom(influences).info();

// toys, they call them selves
function evenOline(n) {
    if (n === 0)
        return true;
    else
        return partial1(oddOline, Math.abs(n) - 1);
}
function oddOline(n) {
    if (n === 0)
        return false;
    else
        return partial1(evenOline, Math.abs(n) - 1);
}

// TODO trampoline - flat recursive calls
// may wrap all racursive calls in 1 function , instead calling all the recursion functions
// to save the stack
function trampoline(fun /*, args */) {
    var result = fun.apply(fun, _.rest(arguments));
    while (_.isFunction(result)) {
        result = result();
    }
    return result;
}
trampoline(oddOline, 300000).info();
// for better api we need hide implementation details in functions
function isEvenSafe(n) {
    if (n === 0)
        return true;
    else
        return trampoline(partial1(oddOline, Math.abs(n) - 1)); // hidden implementation
}
function isOddSafe(n) {
    if (n === 0)
        return false;
    else
        return trampoline(partial1(evenOline, Math.abs(n) - 1));
}
//isEvenSafe(2000001).info(); // still quite slow


//TODO generators
function generator2(seed, current, step) {
    return {
        head: current(seed),
        tail: function () {
//            console.log("forced");
            return generator2(step(seed), current, step);
        }
    };
}
function genHead(gen) {
    return gen.head
}
function genTail(gen) {
    return gen.tail()
}
var ints = generator2(0, _.identity, function (n) {
    return n + 1
});
genHead(ints).info();               // 0
genTail(genTail(ints));

// gives    // might be worth to have accumulator in this generator
function genTake(n, gen) {
    var doTake = function (x, g, ret) {
        if (x === 0)
            return ret;
        else
            return partial(doTake, x - 1, genTail(g), cat(ret, genHead(g)));
    };
    return trampoline(doTake, n, gen, []);
}
genTake(10, ints).info();

function influenced(graph, node) {
    return _.map(groupFrom(graph)[node], second);
}
influencedWithStrategy(preDepth, 'Lisp', influences).info();
influenced(influences, 'Lisp').info();

// TODO purity means also testing, map is pure, rand is not
//describe("_.map", function() {
//    it("should return an array made from...", function(){
//        expect(_.map([1,2,3], sqr)).toEqual([1, 4, 9]);
//    });
//});

var PI = 3.14;
function areaOfACircle(radius) {
    return PI * sqr(radius);
}
areaOfACircle(3);
//=> 28.26 , but if other library overwrite the PI, we got oops

var rand = partial1(_.random, 1);
// may spread out pure vs impure parts
function generateRandomCharacter() {
    return rand(26).toString(36);
}
function generateString(charGen, len) {
    return repeatedly(len, charGen).join('');
}
generateString(generateRandomCharacter, 20).info();
var composedRandomString = partial1(generateString, generateRandomCharacter);
composedRandomString(10).info();
//purity gives you freedom in composing functions(and switching them)

// TODO Idempotence - execyte once = execute many times
//someFun(arg) == _.compose(someFun, someFun)(arg);
Math.abs(Math.abs(-42)).info();


//TODO imutability
function skipTake(n, coll) {
    var ret = [];
    var sz = _.size(coll);
    for (var index = 0; index < sz; index += n) {
        ret.push(coll[index]);
    }
    return ret;
}
skipTake(2, [1, 2, 3, 4]).info();      // [1,3]
skipTake(3, _.range(20)).info();    // [0, 3, 6, 9, 12, 15, 18]

// local variable mutability
function summ(array) {
    var result = 0;
    var sz = array.length;
    for (var i = 0; i < sz; i++)
        result += array[i];
    return result;
}
summ(_.range(1, 11)).info();             //=> 55

// recursion
function summRec(array, seed) {
    if (_.isEmpty(array))
        return seed;
    else
        return summRec(_.rest(array), _.first(array) + seed);
}
summRec([], 0).info(); //=> 0
summRec(_.range(1, 11), 0).info();   // 55

// object.freeze is shallow
var freq = curry2(_.countBy)(_.identity);       // counby is pure, do not mutate
var a = repeatedly(1000, partial1(rand, 3));
var copy = _.clone(a);
freq(a);
_.isEqual(a, copy).info();      // true

freq(skipTake(2, a));           // skipp take is also pure
_.isEqual(a, copy).info();

// _.extend is impure
var person = {fname: "Simon"};
_.extend(person, {lname: "Petrikov"}, {age: 28}, {age: 108});
person.info();  // has changed!!

function merge(/*args*/) {
    return _.extend.apply(null, construct({}, arguments));
}
var person = {fname: "Simon"};
merge(person, {lname: "Petrikov"}, {age: 28}, {age: 108}).info();
person.info();

// TODO fluentAPI , chain is not lazy!!
_.chain(library)
    .tap(function (o) {
        console.log(o)
    })       // inject here logger
    .pluck('title')
    .sort()
    .value()
    .info();

function LazyChain(obj) {
    this._calls = [];
    this._target = obj;
}

LazyChain.prototype.invoke = function (methodName /*, args */) {
    var args = _.rest(arguments);
    this._calls.push(function (target) {
        var meth = target[methodName];
        return meth.apply(target, args);
    });
    return this;
};
LazyChain.prototype.force = function () {
    return _.reduce(this._calls, function (target, thunk) {
        return thunk(target);
    }, this._target);
};
LazyChain.prototype.tap = function (fun) {
    this._calls.push(function (target) {
        fun(target);
        return target;
    });
    return this;
}

new LazyChain([2, 1, 3]).invoke('sort')._calls.info();    // called thunk, from AGOL days
new LazyChain([2, 1, 3]).invoke('sort')._calls[0]([2, 1, 3]).info();
new LazyChain([2, 1, 3]).invoke('sort').force().info();
new LazyChain([2, 1, 3])
    .invoke('concat', [8, 5, 7, 6])
    .invoke('sort')
    .invoke('join', ' ')
    .force();
new LazyChain([2, 1, 3])
    .invoke('sort')
    .tap(console.log)
    .force();

var deferredSort = new LazyChain([666, 6, 66])            // deffered object
    .invoke('sort')
    .tap(console.log);

deferredSort.info();
//deferredSort.force();                                 // fullfill defered resolve

function LazyChainChainChain(obj) {
    var isLC = (obj instanceof LazyChain);
    this._calls = isLC ? cat(obj._calls, []) : [];
    this._target = isLC ? obj._target : obj;
}
LazyChainChainChain.prototype = LazyChain.prototype;
new LazyChainChainChain(deferredSort)
    .invoke('toString')
    .force();

var longing = $.Deferred();
longing.promise().state().info();   // pending
longing.resolve("<3");
longing.promise().state().info();   // resolved
longing.promise().done().info();
function go() {
    var d = $.Deferred();
    $.when("")
        .then(function () {
            setTimeout(function () {
                console.log("sub-task 1");
            }, 5000)
        })
        .then(function () {
            setTimeout(function () {
                console.log("sub-task 2");
            }, 10000)
        })
        .then(function () {
            setTimeout(function () {
                d.resolve("done done done done");
            }, 15000)
        });
    return d.promise();
}
var yearning = go().done().info();

//TODO thrush combinator:
function pipeline(seed /*, args */) {
    return _.reduce(_.rest(arguments),
        function (l, r) {
            return r(l);
        },
        seed);
}

pipeline(42, function (n) {
    return -n
}).info();
pipeline(42).info();

//lol
function fifth(a) {
    return pipeline(a
        , _.rest
        , _.rest
        , _.rest
        , _.rest
        , _.first);
}
fifth([1, 2, 3, 4, 5]).info();              // 5

function negativeFifth(a) {
    return pipeline(a
        , fifth
        , function (n) {
            return -n
        });
}
negativeFifth([1, 2, 3, 4, 5, 6, 7, 8, 9]).info();         // -5

function firstEditions(table) {
    return pipeline(table
        , function (t) {
            return as(t, {ed: 'edition'})
        }
        , function (t) {
            return project(t, ['title', 'edition', 'isbn'])
        }
        , function (t) {
            return restrict(t, function (book) {
                return book.edition === 1;
            });
        });
}
firstEditions(library).info();

// TODO SQL-RQL
var RQL = {
    select: curry2(project),
    as: curry2(as),
    where: curry2(restrict)
};
function allFirstEditions(table) {
    return pipeline(table
        , RQL.as({ed: 'edition'})
        , RQL.select(['title', 'edition', 'isbn'])
        , RQL.where(function (book) {
            return book.edition === 1;
        }));
}
allFirstEditions(library).info();
// data going in to the pipeline should be same as leaving pipeline
// so composing pure function is much easier then others
// use context object to finalize shape

//monads
function actions(acts, done) {
    return function (seed) {
        var init = { values: [], state: seed };
        var intermediate = _.reduce(acts, function (stateObj, action) {
            var result = action(stateObj.state);
            var values = cat(stateObj.values, [result.answer]);
            return { values: values, state: result.state };
        }, init);
        var keep = _.filter(intermediate.values, existy);
        return done(keep, intermediate.state);
    };
}

function mSqr() {
    return function (state) {
        var ans = sqr(state);
        return {answer: ans, state: ans};
    }
}
var doubleSquareAction = actions(
    [
        mSqr(),
        mSqr()
    ],
    function (values) {
        return values;
    }
);
doubleSquareAction(10).info();  // 10, 100

function note(arg) {
    console.log('Note: ' + arg)
}

// now lets mix some other shit to it
function mNote() {
    return function (state) {
        note(state);
        return {answer: undefined, state: state};
    }
}
function mNeg() {
    return function (state) {
        return {answer: -state, state: -state};
    }
}
// monad
var negativeSqrAction = actions(
    [mSqr(), mNote(), mNeg()],
    function (_, state) {
        return state;
    }
);
// action = monad
negativeSqrAction(9).info();    // -81

// TODO converts shit to monads
function lift(answerFun, stateFun) {
    return function (/* args */) {
        var args = _.toArray(arguments);
        return function (state) {
            var ans = answerFun.apply(null, construct(state, args));
            var s = stateFun ? stateFun(state) : ans;
            return {answer: ans, state: s};
        };
    };
}
var mSqr2 = lift(sqr);
var mNote2 = lift(note, _.identity);
var mNeg2 = lift(function (n) {
    return -n
});
var negativeSqrAction2 = actions(
    [mSqr2(), mNote2(), mNeg2()],
    function (_, state) {
        return state;
    }
);
negativeSqrAction2(9).info();

// TODO stack!!!
var push = lift(function (stack, e) {
    return construct(e, stack)
});
var pop = lift(_.first, _.rest);
var stackAction = actions(      // compose stack
    [
        push(1),
        push(2),
        pop()
    ],
    function (values, state) {
        return values;
    }
);
stackAction([]).info(); // [ [ 1 ], [ 2, 1 ], 2 ]
pipeline(                   // decompose stack
    []
    , stackAction
    , _.chain)
    .each(function (elem) {
        console.log((elem).info());  // [1], [2, 1], 2
    });

// TODO lazy best implementation
function lazyChain(obj) {
    var calls = [];
    return {
        invoke: function (methodName /* args */) {
            var args = _.rest(arguments);
            calls.push(function (target) {
                var meth = target[methodName];
                return meth.apply(target, args);
            });
            return this;
        },
        force: function () {
            return _.reduce(calls, function (ret, thunk) {
                return thunk(ret);
            }, obj);
        }
    };
}
var lazyOp = lazyChain([2, 1, 3])
    .invoke('concat', [7, 7, 8, 9, 0])
    .invoke('sort');

lazyOp.force().info();  // [ 0, 1, 2, 3, 7, 7, 8, 9 ]

function deferredSort(ary) {
    return lazyChain(ary).invoke('sort');
}
//var deferredSorts = _.map([[2,1,3], [7,7,1], [0,9,5]], deferredSort);
//deferredSorts.info();
function force(thunk) {
    return thunk.force();
}
//_.map(deferredSorts, force).info();

var validateTriples = validator(
    "Each array should have three elements",
    function (arrays) {
        return _.every(arrays, function (a) {
            return a.length === 3;
        });
    }
);
var validateTripleStore = partial1(condition1(validateTriples), _.identity);
validateTripleStore([
    [2, 1, 3],
    [7, 7, 1],
    [0, 9, 5]
]).info();
try {
    validateTripleStore([
        [2, 1, 3],
        [7, 7, 1],
        [0, 9, 5, 7, 7, 7, 7, 7, 7]
    ]);
} catch (e) {
    e.info();
}
function postProcess(arrays) {
    return _.map(arrays, second);
}
function processTriples(data) {
    return pipeline
    (data
        , JSON.parse
        , validateTripleStore
        //, deferredSort
        //, force
        , postProcess
        , invoker('sort', Array.prototype.sort)
        , str);
}
processTriples("[[2,1,3], [7,7,1], [0,9,5]]").info();   // 1,7,9
// on bad data it will terminate early

function stringifyArray(ary) {
    return ["[", _.map(ary, polyToString).join(","), "]"].join('');
}

// write to a string
//if string return
// ealse object.toString() ... to funcitonal
//dispatch tryes return non - undentified value
var polyToString = dispatch(
    function (s) {
        return _.isString(s) ? s : undefined
    },
    function (s) {
        return _.isArray(s) ? stringifyArray(s) : undefined
    },   // may add function to composition
    function (s) {
        return _.isObject(s) ? JSON.stringify(s) : undefined
    },   // to accomodate more data structures
    function (s) {
        return s.toString()
    }
);
polyToString([1, 2, [3, 4]]).info();
polyToString({ala: 'makota'}).info();

// mixins
function Container(val) {
    this.value = val;
    this.init(val);
}
Container.prototype.init = _.identity;
var c = new Container(42);  // { _value: 42 }
c.info();

var HoleMixin = {
    setValue: function (newValue) {       // interface
        var oldVal = this.value;
        this.validate(newValue);        // protocol/template extension
        this.value = newValue;
        this.notify(oldVal, newValue);  // extension
        return this.value;
    }
};
var Hole = function (val) {
    Container.call(this, val);
};

var CAS = function(val) {
    Hole.call(this, val);
};
//var h = new Hole(42);  // no method init  // need to implement

var ObserverMixin = (function () {
    var watchers = [];
    return {
        watch: function (fun) {
            watchers.push(fun);
            return _.size(watchers);
        },
        notify: function (oldVal, newVal) {
            _.each(watchers, function (watcher) {
                watcher.call(this, oldVal, newVal);
            });
            return _.size(watchers);
        }
    };
}());

var ValidateMixin = {
    addValidator: function (fun) {
        this.validator = fun;
    },
    init: function (val) {
        this.validate(val);
    },
    validate: function (val) {
        if (existy(this.validator) && !this.validator(val))
            throw("Attempted to set invalid value " + polyToString(val));
    }
};
_.extend(Hole.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin
);
var h = new Hole(42);    //value:42
h.addValidator(always(false));
try {h.setValue(9)} catch (e){e.info()} // Attempted to set invalid value 9

var h2 = new Hole(42);
h2.addValidator(isEven);
h2.setValue(8).info();
try {h2.setValue(9)} catch (e){e.info()}

h2.watch(function(old, nu) {
    note(["Changing", old, "to", nu].join(' '));
});
h2.setValue(42);
h2.info();

h2.watch(function(old, nu) {
    note(["Veranderende", old, "tot", nu].join(' '));
});
h2.setValue(36);    //Note: Changing 42 to 36
h2.info();          //Note: Veranderende 42 tot 36
//{ value: 36, validator: [Function: isEven] }

var SwapMixin = {
    swap: function(fun /* , args... */) {           // interface
        var args = _.rest(arguments);
        var newValue = fun.apply(this, construct(this.value, args));
        return this.setValue(newValue);             // extension(need to provide setValue)
    }
};
var o = {value: 0, setValue: _.identity};
_.extend(o, SwapMixin);
o.swap(construct, [1,2,3]).info(); //0,1,2,3
var SnapshotMixin = {
    snapshot: function() {
        return deepClone(this.value);
    }
};
_.extend(Hole.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin
    , SwapMixin
    , SnapshotMixin
);
var h3 = new Hole(42);
h3.snapshot();  // 42
h3.swap(always(99)); //99 + notes about changing values
h3.snapshot(); // 99

var CASMixin = {
    swap: function(oldVal, f) {
        if (this.value === oldVal) {
            this.setValue(f(this.value));
            return this.value;
        }
        else {
            return undefined;
        }
    }
};

_.extend(CAS.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin
    , SwapMixin
    , CASMixin
    , SnapshotMixin
);
var c = new CAS(42);
c.swap(42, always(-1));
c.snapshot();       // -1
c.swap('not the value', always(100000));    //undentified
c.snapshot();
///////////////////////////////////end of mixin

function contain(value) {
    return new Container(value);
}
contain(42);   //=> {_value: 42} (of type Container, but who cares?)
function hole(val /*, validator */) {
    var h = new Hole();
    var v = _.toArray(arguments)[1];
    if (v) h.addValidator(v);
    h.setValue(val);
    return h;
}

try {
    var x = hole(42, always(false));
} catch (e){
    e.info();       // atemt to put invalid value
}
var swap = invoker('swap', Hole.prototype.swap);
var x = hole(42);
//swap(x, hole(1762)).info();
function cas(val /*, args */) {
    var h = hole.apply(this, arguments);
    var c = new CAS(val);
    c.validator = h.validator;
    return c;
}
var compareAndSwap = invoker('swap', CAS.prototype.swap);
function snapshot(o) { return o.snapshot() }
function addWatcher(o, fun) { o.watch(fun) }        // generic , not mixing

var x = hole(42);
addWatcher(x, note);
swap(x, hole(42));      // NOTE: 42 chapter01.js:38
var y = cas(9, isOdd);  //=> 1764
compareAndSwap(y, 9, always(1));
snapshot(y);        //=> 1
