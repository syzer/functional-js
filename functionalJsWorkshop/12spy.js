/**
 * Created by syzer on 6/1/2014.
 */
//function Spy(target, method) {
//    var count = 0;
//    target.count = count;
//    target[method] = function () {
//        target.count+=1;
//        return method;
//    };
//    return target;
//}

function Spy(target, method) {
    var orginalMethod = target[method];
    var spy = {         // pass by reference!!!!!!
        count: 0
    };
    target[method] = function () {
        spy.count+=1;
        return orginalMethod.apply(this, arguments);    // preserve orginal context!!
    };
    return spy;
}


module.exports = Spy;

//
//var spy = Spy(console, 'error');
//console.error('calling console.error');
//console.error('calling console.error');
//console.error('calling console.error');
//console.log(spy.count); // 3
