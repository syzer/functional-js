/**
 * Created by syzer on 8/7/2014.
 */
//https://www.youtube.com/watch?v=L7b7AW14rYE
var _ = require('scoreunder');
var LambdaJs = require('lambdajs');
LambdaJs.expose(global);
var lo_ = require('lodash');

var find = lo_.find;
//console.log('\nfind', typeof find);

// To play around with this code, copy and paste the contents of this gist
// into the javascript pane of http://jsbin.com/umoK/1/edit or go to
// http://jsbin.com/uZAfIqA/2/edit

// =============================================================================
// Generic API
// =============================================================================

var autoCurry = function (fn, numArgs) {
    numArgs = numArgs || fn.length;
    var f = function () {
        if (arguments.length < numArgs) {
            return numArgs - arguments.length > 0 ?
                autoCurry(curry.apply(this, [fn].concat([arguments])),
                        numArgs - arguments.length) :
                curry.apply(this, [fn].concat([arguments]));
        }
        else {
            return fn.apply(this, arguments);
        }
    };
    f.toString = function () {
        return fn.toString();
    };
    f.curried = true;
    f.fn = fn;
    f.arity = fn.length;
    return f;
};
exports.autoCurry = autoCurry;
Function.prototype.autoCurry = function (n) {
    return autoCurry(this, n);
};

var add = function (a, b) {
    return a + b
}.autoCurry();
var sum = reduce(add, 0);
console.log(sum([1, 2, 3]));

//+ words :: string -> array
var words = split(' ');

//+ not :: _ -> boolean
var not = function (x) {
    return !x;
};

//+ uniqBy :: array -> array
var uniqBy = function (param, arr) {
    return reduce(function (memo, item) {
        var items = pluck(param, memo);
        return (_.indexOf(item[param], items) > -1) ? memo : push(item, memo);
    }, [], arr);
}.autoCurry();

//+ arrayToTuples :: array -> array
var arrayToTuples = reduce(function (memo, item, index, list) {
    return push([item, list[index + 1]], memo);
}, []);


// =============================================================================
// Application API
// =============================================================================

//+ isVoteString :: string -> boolean
var isVoteString = test(/^[\+|\-]\d+$/);

//+ isValidVote :: object -> boolean
var isValidVote = function (vote) {
    return vote.user && vote.points;
};


//+ tupleToVote :: array -> object
var tupleToVote = function (tuple) {
    return {
        points: find(tuple, isVoteString),
        user: find(tuple, compose(not, isVoteString)),
//        points: find(isVoteString, tuple),
//        user: find(compose(not, isVoteString), tuple)
    };
};

//+ getAllVotes :: string -> array
var getAllVotes = compose(map(tupleToVote), arrayToTuples, words);

//+ getUniqVotes :: string -> array
var getUniqVotes = compose(uniqBy('user'), filter(isValidVote), getAllVotes);


// =============================================================================
// Execution Logic
// =============================================================================

var input = '-1 kevin +1 kevin +1 test +1 +1 joe +1';

compose(console.log, getUniqVotes)(input);
