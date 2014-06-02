/**
 * Created by syzer on 6/1/2014.
 */
function repeat(operation, num) {
    // Modify this so it doesn't cause a stack overflow!
    //if (num <= 0) return;
//    operation();
    return {
        next: function() {
            num--;
            return num>=0;
        },
        action: function() {
            operation();
        }
    }
}

function trampoline(fn) {
    var acc = [];
    var results = [];
//    console.log(fn);
    while (fn.next()) {
        acc.push(fn.action);
    }
    acc.forEach(function(action){
        return results.push(action());
    });
    return results;
}

module.exports = function(operation, num) {
    // You probably want to call your trampoline here!
    return trampoline(repeat(operation, num));
};
