/**
 * Created by syzer on 14/1/29.
 */
// callbackHellFix
var when = require('when');
var fs = require('fs');

function times2(x) {
    var deferred = when.defer();    //create deferred
    setTimeout(function(){
       deferred.resolve(x * 2)}, 2500);  //when value is resolved call resolve

    return deferred.promise;    //return promise
}

function plus3(x) {
    var deferred = when.defer();
    setTimeout(function() {
        deferred.resolve(x*3)
    }, 2500);
    return deferred.promise;
}

function plus3AndThenTimes2(x) {
    return plus3(x).then(times2);   //value => promise
}

plus3AndThenTimes2(10).then(displayResult);

function displayResult(a) {
    console.log(a);
}

//or
function sum(a,b) {
    var deferred = when.defer();
    setTimeout(function() {
        deferred.resolve(a + b);
    }, 500);

    return deferred.promise;
}
//times2(x) + plus3(x)
function plus3PlusTimes2(x) {
    var p3 = plus3(x);
    var t2 = times2(x);

    return when.join(p3, t2).spread(sum);   //combine two promises
}

plus3PlusTimes2(10).then(displayResult);

//calling on non-promise code
var deferred = when.defer();
var path = __dirname;
fs.stat(path, function (err, statInfo) {
    if(err)
        deferred.reject(err);
    else
        deferred.resolve(statInfo);
});
var promise = deferred.promise;

//using super when feture
var nodefn = require("when/node/function");
var promise = nodefn.call(fs.stat, path); //hide the boiler plate

///////////////////////////////
//from examples

var rest = require('rest');
// MAP!!! combines functions
when.reduce(when.map(getRemoteNumberList(), times10), sumNumbers)
    .done(function(result) {
        console.log(result);
    });

function getRemoteNumberList() {
    // Get a remote array [1, 2, 3, 4, 5]
    return rest('http://example.com/numbers').then(JSON.parse);
}

function sumNumbers(x, y) { return x + y; }
function times10(x) {return x * 10; }

fetchRemoteGreeting()
    .then(addExclamation)
    .catch(handleError)
    .done(function(greeting) {
        console.log(greeting);
    });

function fetchRemoteGreeting() {
    // returns a when.js promise for 'hello world'
    return rest('http://example.com/greeting');
}

function addExclamation(greeting) {
    return greeting + '!!!!';
}

function handleError(e) {
    return 'drat!';
}
