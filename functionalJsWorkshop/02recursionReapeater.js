/**
 * Created by syzer on 5/31/2014.
 */
function repeat(operation, num) {
    if (num <= 0) return;
    operation();
    return repeat(operation, num-1);
}

module.exports = repeat;
