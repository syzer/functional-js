/**
 * Created by syzer on 8/23/2014.
 */

_ = require('lodash');

function isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//    if ('' === email || re.test(email) !== email) {
//        return false;
//    }
//    return true;
    return re.test(email);
}

function validateEmail(line, i) {
    //console.log(isValidEmail((line)));
    return (isValidEmail(line) ? 'true' : 'false');
}

function run(input) {
    return readLines(input, validateEmail);
}

function readLines(input, lineCallback) {
    return _.map(input.split('\n'), function (line, i) {
        if ('' === line) {
            return;
        }
        return lineCallback(line, i);
    }).join('\n');
}

module.exports.run = run;
