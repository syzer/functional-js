/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

function groupByNrOfEl(array, el) {
    var groupByEl = [];
    var group = [];
    array.forEach(function (num, i) {
        group.push(num);
        if (i % el === el - 1 || i === array.length - 1) {
            groupByEl.push(_.clone(group));
            group = [];
        }
    });
    return groupByEl;
}

function stringSubstitutions(line, i) {
    var data = line.split(';');
    var string = data[0];
    var modifiedString = _.clone(string);
    var modified = [];
    var substitutions = groupByNrOfEl(data[1].split(','), 2);
    substitutions.forEach(function (group) {
        var newString = _.clone(string);
        var fromMatch = newString.indexOf(group[0]);
        while (fromMatch !== -1) {
            //TODO check if already there
            var modifiedIndexes = _.range(fromMatch, fromMatch + group[0].length);
            if (_.isEmpty(_.intersection(modified, modifiedIndexes))) {
                modified.push(modifiedIndexes);
//                console.log('\nrange',fromMatch,  _.range(fromMatch, group[0].length + 1));
                newString = newString.substr(fromMatch + group[0].length);
                console.log('\nBAZ', newString);
                newString = newString.replace(group[0], group[1]);
            }else {
                console.log('modified:',modified, modifiedIndexes);
            }
            fromMatch = newString.indexOf(group[0]);

            console.log('\nnewString', newString, fromMatch, modified, string, modifiedString);
        }
//        newString = newString.replace(group[0], group[1]);
        // calc diff

        console.log('\nmodified:', modified, group[0].length + 1);

//        var diffString = _(modifiedString).map(function (num, i) {
//            return num === newString[i] ? 1 : 0;
//        }).join('');
//        console.log('\ndiffstring', diffString, fromMatch);

//        console.log('\n:', string, group, group[0], group[1]);
        // xor modified with old
        // check modi
        var newString = _.replaceAll(string, group[0], group[1]);

//        var diffString = newString & string;
    });
    return string;
}

function readLines(input, lineCallback) {
    return input
        .split('\n')
        .map(function (line, i) {
            if ('' === line) {
                return;
            }
            return lineCallback(line, i);
        })
        .join('\n');
}

function run(input) {
    return readLines(input, stringSubstitutions);
}

module.exports.run = run;
