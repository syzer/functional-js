/**
 * Created by syzer on 6/1/2014.
 */
function repeat(operation, num) {
    if (num <= 0) return;
    operation();

    // release control every 40 iterations.
    if (num % 40 === 0) {
        setTimeout(function() {
            return repeat(operation, --num)
        })
    } else {
        return repeat(operation, --num)
    }

}

module.exports = repeat;
