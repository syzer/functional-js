/**
 * Created by syzer on 6/2/2014.
 */
//module.exports = Function.prototype.call.call(Array.prototype.slice);
module.exports = Function.call.bind(Array.prototype.slice);

//var slice = module.exports;
////console.log(slice);
//var nums = [1,2,3,4,5];
//
//// your slice function should match the regular
//// behaviour of slice, except it takes the array
//// as the first arguments
//
//slice(nums, 0, 2) ;// [1, 2]
//slice(nums, 1, 2); // [2]
//
//// regular slice usage for comparison
//nums.slice(0, 2) // [1, 2]
//nums.slice(1, 2) // [2]
