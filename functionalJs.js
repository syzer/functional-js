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

function doWhen(cond, action){
    if (truthy(cond)) {
        return action();
    } else {
        return undefined;
    }
}

function executeIfHasField(target, name) {
    return doWhen(existy(target[name]), function() {
        return _.result(target, name);
    })
}
console.log(executeIfHasField([1,2,3], 'reverse'));       // 3,2,1
console.log(executeIfHasField({foo: 42}, 'foo'));         // 42
console.log(executeIfHasField({foo: 42}, 'not there'));   // undefined

var a = [null, undefined, 1, 2, false].map(existy);
var b = [null, undefined, 1, 2, false].map(truthy);
console.log(a, b);


