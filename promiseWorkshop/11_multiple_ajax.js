/**
 1. Send an HTTP GET request to the session cache on port 7000.  A JSON payload
 will be returned to you containing a primary key called "id".
 2. Grab that id from the session response and send an HTTP GET request to
 your database on port 7001 to the url "localhost:70001/<id>".
 3. If successfully done, your database will return a user object.  console.log
 it to win many nerd-points.
 */

"use strict";

var q = require('bluebird');
var request = q.promisify(require("request"));

request('http://localhost:7000')
    .then(function (resp) {
        return resp[1];
    })
    .then(function (userId) {
        return request('http://localhost:7001/' + userId)
    })
    .then(function (resp) {
        return JSON.parse(resp[1]);
    })
    .then(console.log)
    .catch(function (e) {
        console.error(e, e.message);
    });

