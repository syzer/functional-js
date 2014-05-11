/**
 * Created by syzer on 14/1/29.
 */
var express = require('express');
var rest = require('rest');
var whenLib = require('when');

function times2(x) {
    var deferred = when.defer();    //create deferred
    setTimeout(function(){
       deferred.resolve(x * 2)}, 500);  //when value is resolved call resolve

    return deferred.promise;    //return promise
}

function plus3(x) {
    var deferred = when.defer();
    setTimeout(function() {
        deferred.resolve(x*3)
    }, 500);
    return deferred.promise;
}

function plus3AndThenTimes2(x) {
    return plus3(x).then(times2);   //value => promise
}

plus3AndThenTimes2(10).then(displayResult);


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

fs.stat(path, function (err, statInfo) {
    if(err)
        deferred.reject(err);
    else
        deferred.resolve(statInfo);
})
var promise = deferred.promise;

//using super when feture
var nodefn = require("when/node/function");
var promise = nodefn.call(fs.stat, path); //hide the boiler plate

