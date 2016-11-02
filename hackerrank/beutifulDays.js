function processData(input) {
    const isInt = n => n.toFixed(0) == n
    let [from, to, divider] = input.split(' ').map(e => parseInt(e))
    let days = 0
    for (let day = from; day <= to; day++) {
        let reversed = +day.toString().split('').map(e => parseInt(e)).reverse().join('')
        let formula = Math.abs(day - reversed) / divider
        if (isInt(formula)) {
            days++
        }
    }
    console.log(days)
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});


/**
 *

 Lily likes to play games with integers and their reversals. For some integer , we define to be the reversal of all digits in . For example, , , and .

 Logan wants to go to the movies with Lily on some day satisfying , but he knows she only goes to the movies on days she considers to be beautiful. Lily considers a day to be beautiful if the absolute value of the difference between and is evenly divisible by .

 Given , , and , count and print the number of beautiful days when Logan and Lily can go to the movies.

 Input Format

 A single line of three space-separated integers describing the respective values of , , and .

 Constraints

 Output Format

 Print the number of beautiful days in the inclusive range between and .

 Sample Input

 20 23 6

 Sample Output

 2

 Explanation

 Logan wants to go to the movies on days , , , and . We perform the following calculations to determine which days are beautiful:

 Day is beautiful because the following evaluates to a whole number:
 Day is not beautiful because the following doesn't evaluate to a whole number:
 Day is beautiful because the following evaluates to a whole number:
 Day is not beautiful because the following doesn't evaluate to a whole number:

 Only two days, and , in this interval are beautiful. Thus, we print as our answer.
 */