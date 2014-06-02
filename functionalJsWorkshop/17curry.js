/**
 * Created by syzer on 6/2/2014.
 */
function curryN(fn, n) {
    var done = [];
    if (!n) n = fn.length;
    return function curried(arg) {
        done.push(arg);
        if (done.length === n) {
            return fn.apply(this, done);
        }
        return curried;
    };
}
//function curryN(fn, n) {
//    // If `n` argument was omitted, use the function .length property.
//    if (typeof n !== 'number') n = fn.length;
//
//    function getCurriedFn(prev) {
//        return function(arg) {
//            // Concat the just-specified argument with the array of
//            // previously-specified arguments.
//            var args = prev.concat(arg);
//            // Not all arguments have been satisfied yet, so return a curried
//            // version of the original function.
//            if (args.length < n) return getCurriedFn(args);
//            // Otherwise, invoke the original function with the arguments and
//            // return its value.
//            else return fn.apply(this, args)
//        };
//    }
//
//    // Return a curried version of the original function.
//    return getCurriedFn([])
//}

module.exports = curryN;


//var concat= curryN(strConcat, 5)('This')('problem')('has')('been')('solved');
//console.log(concat);
//console.log(curryN(add3)(1)(2)(3));
//
//function strConcat(){
//    var args = Array.prototype.slice.call(arguments);
//    return Array.prototype.concat.apply([], args).join(" ");
//}
//function add3(one, two, three) {
//    return one + two + three
//}
//var curryC = curryN(add3, 3);
//var curryB = curryC(1);
//var curryA = curryB(2);
//console.log(curryA(3)); // => 6
//console.log(curryA(10)); // => 13

//console.log(curryN(add3)(1)(2)(3)); // => 6
