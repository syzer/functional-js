/**
 * Created by syzer on 6/1/2014.
 */
module.exports = function arrayMap(arr, fn) {

    var callback = function(prev, curr, index, array) {
        if (index === 1) {
            array[0] = fn(prev);
        }
        array[index] = fn(curr);
        return array;
    };
    return arr.reduce(callback);

    //or
//    return arr.reduce(function(acc, item, index, arr) {
//        return acc.concat(fn(item, index, arr))
//    }, [])
};

//var map = module.exports;
//var nums = [1,2,3,4,5];
//`map` is your exported function
//var output = map(nums, function double(item) {
//    return item * 2
//});

//console.log(output); // => [2,4,6,8,10]
