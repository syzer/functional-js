/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

//TODO Lib
function groupByNrOfEl(array, el) {
    var groupBy3 = [];
    var group = [];
    array.forEach(function (num, i) {
        group.push(num);
        if (i % el === el-1 || i === array.length - 1) {
            groupBy3.push(_.clone(group));
            group = [];
        }
    });
    return groupBy3;
}

function stringSubstitutions(line, i) {
    var data = line.split(';');
    var string = data[0];
    var modifiedString = _.clone(string);
    var substitutions = groupByNrOfEl(data[1].split(','), 2);
    substitutions.forEach(function(group) {
        console.log('\n:',string, group, group[0], group[1]);
        string = _.replaceAll(string, group[0], group[1]);
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
