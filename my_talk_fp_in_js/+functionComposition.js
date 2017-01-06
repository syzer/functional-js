/**
 * Created by syzer on 10/29/2014.
 */
var _ = require('lodash');
//var lengths = _.compose(
//    _.map(_.size), _.curry(_.split(' '))
//);
//_.mixin({lengths: lengths});
//console.log(_.lengths('once upon a time'));

//var curriedMap = _.curry(_.map);
//var curriedSize = _.curry(_.size);
//
//var mapSize = _.compose(curriedMap, curriedSize);
//console.log(mapSize('Lenistwo')()());




//TODO
const articles = [
    {
        title: 'Everything Sucks',
        url: 'http://do.wn/sucks.html',
        author: {
            name: 'Debbie Downer',
            email: 'debbie@do.wn'
        }
    },
    {
        title: 'If You Please',
        url: 'http://www.geocities.com/milq',
        author: {
            name: 'Caspar Milquetoast',
            email: 'hello@me.com'
        }
    }
]

// Return a list of the author names in
// articles using only _.get, _.compose, and
// _.map.
//var firstTitle = undefined;
//console.log('Everything Sucks' === firstTitle(articles));



//var isAuthor = _.curry(function(x, xs){
//    return _.compose(_.contains(x), names)(xs);
//});

//isAuthor('New Guy', articles);
