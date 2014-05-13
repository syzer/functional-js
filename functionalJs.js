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
var result = _.filter(['a','b',3,'c'], complement(_.isNumber));
function complement(PRED) {                                 // is like ! = or underscore reject
    return function() {
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
    return _.reduce(table, function(newTable, obj) {
        if (truthy(pred(obj)))
            return newTable;
        else
            return _.without(newTable, obj);
    }, table);
}
print (restrict(library, function(book) {       // [ { title: 'SICP', isbn: '0262510871', ed: 2 } ]
    return book.ed > 1;
}));

var editionBiggerThanOne = restrict(        // [ { title: 'SICP', isbn: '0262510871', edition: 2 } ]
    project(
        as(library, {ed: 'edition'}),
        ['title', 'isbn', 'edition']),
    function(book) {
        return book.edition > 1;
    });
print(editionBiggerThanOne);

//TODO EXAM QUESTION ABOUT CLOSUERS
function whatWasTheLocal() {
    var CAPTURED = "Oh hai";
    return function() {
        return "The local was: " + CAPTURED;
    };
}
var reportLocal = whatWasTheLocal();
print(reportLocal());   //=> "The local was: Oh hai"

function createScaleFunction(FACTOR) {
    return function(v) {
        return _.map(v, function(n) {
            return (n * FACTOR);
        });
    };
}
var scale10 = createScaleFunction(10);
print(scale10([1,2,3]));   //=> [10, 20, 30]
// TODO 65 tells about shadowing, good interview question

// TODO interview question, closure will hold REFERENCE!!! of captured thing,
function isEven(n) { return (n%2) === 0 }
var isOdd = complement(isEven);
isOdd(413);  // true
//but when we destroy the good behavior
function isEven(n) { return false }
isEven(10);  //false
isOdd(13);   // true, as expected :)
isOdd(12);   // false, because reference changed

// example of really fucked up closure
function showObject(OBJ) {
    return function() {
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
    return function(obj) {
        return (obj && obj[FIELD]);
    };
}
var best = {title: "Infinite Jest", author: "DFW"};
var getTitle = plucker('title');
print(getTitle(best));      //Infinite Jest
print(_.filter(library, getTitle)); // filters one without title



