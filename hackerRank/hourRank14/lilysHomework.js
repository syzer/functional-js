// TODO http://www.geeksforgeeks.org/rearrange-array-maximum-minimum-form/

function processData(input) {
    // 4
    // 2 5 3 1
    let arr = input.split('\n')[1].split(' ').map(e => parseInt(e))
    let copy = arr.slice(0) // clone
    let sorted = arr.sort()
    // console.log(sorted, copy)
    let swaps = 0
    let si = 0
    for (let item of copy) {
        if (item == sorted[si]) {
            si++
        } else {
            swaps++
        }
    }
    console.log(arr.length - swaps)
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


//https://www.hackerrank.com/contests/hourrank-14/challenges/lilys-homework
/**
 *

 Whenever George asks Lily to hang out, she's busy doing homework. George wants to help her finish it faster, but he's in over his head! Can you help George understand Lily's homework so she can hang out with him?

 Consider an array of distinct integers, . George can swap any two elements of the array any number of times. An array is beautiful if the sum of among is minimal possible (after, possibly, performing some swaps).

 Given the array , find and print the minimum number of swaps that should be performed in order to make the array beautiful.

 Input Format

 The first line contains a single integer, , denoting the number of elements in the array .
 The second line contains space-separated integers describing the respective distinct values of .

 Constraints

 Output Format

 Print the minimum number of swaps that should be performed in order to make the array beautiful.

 Sample Input

 4
 2 5 3 1

 Sample Output

 2

 Explanation

 Let's define array to be the beautiful reordering of array , as the sum of the absolute values of differences between its adjacent elements is minimal among all permutations and only two swaps ( with and then with ) was performed.

 */