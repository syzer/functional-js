/**
 Let's do something, you know, from "real life"

 Let's fetch JSON over HTTP... YAY!

 Fetching JSON data from remote machines via AJAX is commonplace
 on both the server and client.  Promises also happen to map to AJAX
 particularly well.  Any AJAX request may either succeed or fail
 and never both.  Promises may fulfill or reject and never both.

 So wow.  Much similarity.  Very promising...

 Let's use a new module called q-io to take advantage of its "http.read"
 method which returns a promise for the value of a successful HTTP response body.

 Install by typing

 npm install q-io
 */

"use strict";

var q = require('bluebird');
var request = q.promisify(require("request"));

request('http://localhost:1337')
    .then(function(resp) {
        return JSON.parse(resp[1]);
    })
    .then(console.log);
