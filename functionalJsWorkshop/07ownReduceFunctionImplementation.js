/**
 * Created by syzer on 6/1/2014.
 */
function reduce(arr, fn, initial) {
    var rollingVal = initial || 0;
//    console.log(arr, fn, initial, arr.length);

    if (arr.length == 1) {
        return initial;
    }

    rollingVal = fn(rollingVal, arr.pop());

    return reduce(arr, fn, rollingVal);
}

module.exports = reduce;

//console.log(reduce([1,2,3], function(tot, e){return tot+e}));
