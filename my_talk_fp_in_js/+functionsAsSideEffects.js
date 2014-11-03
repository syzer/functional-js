/**
 * Created by syzer on 10/29/2014.
 */
// write function that behaves like that
// var, globals disallowed
var my = setup(); // alerts 1
my(); // alerts 2

























function setup() {
    console.log(1);
    return function () {
        console.log(2);
    };
}





// 2nd example
// usage
var next = setupNext();
next();         //=> 1
next();         //=> 2
next();         //=> 3









function setupNext() {
    var count = 0;
    return function () {
        return ++count;
    };
}




// 3rd example
nextNum();          //=> 1
nextNum();          //=> 2
nextNum();          //=> 3
nextNum();          //=> 4







function nextNum() {
    var count = 1;
    nextNum = function () {
        return ++count;
    };
    return count;
}









