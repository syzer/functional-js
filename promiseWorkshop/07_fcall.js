/**
 Using Q's fcall to simplify our code

 Wrapping a value or synchronous function call in a promise is a
 fairly easy pattern to capture in a generic way.

 The "Q" library has a function for just this purpose called fcall.

 Task
 Use fcall to replace the entire parsePromised function from the previous lesson.
 */

"use strict";

//var q = require('q');
//
//q.fcall(function () {
//    return JSON.parse(process.argv[2]);
//})
//    .then(null, console.log);

// or
// q.fcall(JSON.parse, process.argv[2])
//    .then(null, console.log)

var b = require('bluebird');
b.try(JSON.parse, process.argv[2])
    .catch(console.log);

//b.try(function () {
//    return JSON.parse(process.argv[2]);
//})
