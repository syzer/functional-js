/**
 * Created by syzer on 5/26/2014.
 */
var allonge = require('allong.es');
var iterators = allonge.es.iterators;
//var iterators = require('allong.es').iterators;
console.log(iterators);

var take = iterators.take,
    map = iterators.map,
    drop = iterators.drop;

var ints = iterators.numbers();
var squares = take(drop(map(ints, function(n) {
    return n * n;
}), 100000), 100);
// defered computatnion till:

var coll = [];
for (var i = 0; i < 100; i++ ) {
    coll.push(squares())
}
console.log(coll);  // fuck! NAN TODO

