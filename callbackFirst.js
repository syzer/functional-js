/**
 * Created by syzer on 10/22/2014.
 */
//http://bahmutov.calepin.co/put-callback-first-for-elegance.html

var numbers = [1, 2, 3, 4, 5];
var isEven = function (x) { return x % 2 === 0; };
console.log(numbers.filter(isEven));

var filter = Array.prototype.filter;
console.log(filter.call(numbers, isEven));



// lodash/underscore aproach
var filter = function (data, cb) {
    return data.filter(cb);
};
console.log(filter(numbers, isEven));
// [2, 4]


// but if we want to pass it around
var not = function (fn) {
    return function () {
        return !fn.apply(null, arguments);
    };
};
var isOdd = not(isEven); // composition
console.log(filter(numbers, isOdd));


function larger(limit, x) {
    return x > limit;
}
var larger3 = larger.bind(null, 3);
console.log(larger3(10)); // true
console.log(filter(numbers, larger3));
//[4,5]

// Place the arguments LESS likely to change first (on the left).
// in this case limit
var larger3 = larger.bind(null, 3);
larger3(10); // true
larger3(1);  // false


//var filterEven = filter.bind(null, isEven); // ?
// DOES NOT WORK
//console.log(filterEven(numbers))

var _ = require('lodash');
var filterEven = _.partial(filter, _, isEven);
console.log(filterEven(numbers));
// [2, 4]

var betterFilter = function (cb, data) {
    return data.filter(cb);
};
var filterEven = betterFilter.bind(null, isEven);
console.log(filterEven(numbers));


console.log('here:', _.filter(numbers, isEven));    // ok but we cannot just take out as side effect the function
// simple argument flip
var under = require('scoreunder');
var filter = under.ba(_.filter);

console.log(filter(isEven, numbers));
// [2, 4]

//also may use lodash-contrib.flip2()
// USAGE OF partialFn
var under = require('scoreunder');
var filterEven = under.partialFn(_.filter, isEven);
console.log(filterEven(numbers));
// [2, 4]
