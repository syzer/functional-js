/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);

// recommend hobby based on friends list(with hobbies) and disallowed hobbies
// for that person
// +recommendHobby :: array, array -> array
function recommendHobby(friends, disallowedHobbies) {
    var halfOfFriends = friends.length / 2;

    return _(friends)
        .map(function (person) {
            return person[2];
        })
        .flatten()
        .filter(function hobbiesPersonHaveAlready(hobby) {
            return !_.contains(disallowedHobbies, hobby);
        })
        .countBy()
        .pairs()
        .filter(function (hobby) {
            return hobby[1] >= halfOfFriends
        })
        .map(_.first)
        .sortBy()
        .value();
}

function findFriendsOf(peoples, person) {
    return peoples.filter(function (friend) {
        return _.contains(person[1], friend[0]); // TODO memoized??
    })
}

// gives sorted intersection
function suggestGroups(peoples) {
    return peoples.reduce(function (acc, person) {
        var friendsHobbies = recommendHobby(findFriendsOf(peoples, person), person[2]);
        if (!_.isEmpty(friendsHobbies)) {
            acc.push(person[0] + ':' + friendsHobbies.join(','));
        }
        return acc;
    }, []);
}

function prepareInput(lines) {
    return lines
        .split('\n')
        .filter(function (line, i) {
            return line !== '';
        })
        .map(function (line) {
            return line.split(':')
        })
        .map(function extractUsers(line) {
            line[1] = line[1].split(',');
            line[2] = line[2].split(',');
            return line
        });
}

function prepare(lines) {
    return suggestGroups(prepareInput(lines)).join('\n');
}

function run(input) {
    return readLines(input, prepare);
}

function runAll(input) {
    return prepare(input);
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

module.exports.run = run;
module.exports.runAll = runAll;
