/**
 * Created by syzer on 8/27/2014.
 */

_ = require('lodash');

var first = 2 * 3 + 2 * 5 + 2 * 7 + 9 * 2 + 11 * 2 + 13 * 2 + 15 * 2 + 17 * 2 + 19 * 2;
var whole = first * 4 + 1; // zerro
// 793

function calcQuater(start) {
    var numbers = _.range(1, start);
    console.log(numbers);

    return numbers.reduce(function (acc, number, i, numbers) {
        console.log(acc, 'number', number);
        // 8: 7*2 +1
        return acc + (number - 1) * 2 + 1
    }, 0)
        //   7          6            5           4        3
        + 6 * 2 + 1 + 5 * 2 + 1 + 3 * 2 + 1 + 2 * 2 + 1 + 1
        // initial
        + start * 2 + 1;
}

function calcLowerPart(start) {
    var numbers = _.range(1, start).reverse();
    console.log(numbers);

    return numbers.reduce(function (acc, num, i, numbers) {
        console.log('num:', num, 'dots:', num * 2 + 1, 'sum:', acc + (num * 2 + 1));
        return acc + (num * 2 + 1);
    }, 0) + 1;
}

function calcDiamond(start) {
    var numbers = _.range(1, start + 1);
    console.log(numbers);

    return numbers.reduce(function (acc, num, i, numbers) {
        console.log('num:', num, 'dots:', num * 2 + 1, 'sum:', acc + (num * 2 + 1));
        return acc + (num * 2 + 1);
    }, 0) + 1;

}

function run(start) {
    return calcDiamond(start)+ calcLowerPart(start);
    // -3 for the 0.0 added 4 times
    // -start *4 for axis was added 8 times and need to me added 4
}

module.exports.run = run;
