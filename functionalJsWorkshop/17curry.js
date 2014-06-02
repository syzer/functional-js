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
