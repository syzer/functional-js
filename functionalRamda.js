/**
 * Created by syzer on 10/22/2014.
 */
// Underscore/Lodash style:
var _ = require('lodash');
var R = require('ramda');

var validUsersNamedBuzz = function (users) {
    return _.filter(users, function (user) {
        return user.name === 'Buzz' && _.isEmpty(user.errors);
    });
};


// Ramda style:
var validUsersNamedBuzz2 = R.filter(R.where({name: 'Buzz', errors: R.isEmpty}));

var users = [
    {name:'Buzz', errors: [ 'eat pizza'], day:1},
    {name:'Buzz', errors: [], day:2}
];
console.log(_.isEqual(validUsersNamedBuzz2(users), validUsersNamedBuzz(users))); // true


//CURRIED
// `prop` takes two arguments. If I just give it one, I get a function back
var moo = R.prop('moo');
// when I call that function with one argument, I get the result.
var value = moo({moo: 'cow'}); // => 'cow'
console.log(value);



var amtAdd1Mod7 = R.compose(R.modulo(7), R.add(1), R.prop('amount'));
// we can use that as is:
console.log(amtAdd1Mod7({amount: 16})); // => 4
amtAdd1Mod7({amount: 987}); // => 1
amtAdd1Mod7({amount: 68}); // => 6


var amounts = [
    {amount: 903}, {amount: 2875654}, {amount: 6}
];
//var amountsToValue = Array.prototype.map(amtAdd1Mod7);   // ERROR!!!
var amountsToValue = R.map(amtAdd1Mod7);
console.log(amountsToValue(amounts)); // => [ 7, 7, 0 ]
