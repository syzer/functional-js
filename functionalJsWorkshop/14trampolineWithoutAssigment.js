/**
 * Created by syzer on 6/1/2014.
 */
function repeat(operation, num) {
    if (num <= 0) return;
    return function () {
        operation();
        return repeat(operation, --num)
    }
}

function trampoline(fn) {
    while (fn && typeof fn === 'function') {
        fn = fn()
    }
}

module.exports = function (operation, num) {
    // You probably want to call your trampoline here!
    trampoline(function () {
        return repeat(operation, num)
    });
};
