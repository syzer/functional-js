/**
 * @see https://www.hackerrank.com/contests/programming-interview-questions/challenges/coin-change
You have  types of coins available in infinite quantities where the value of each coin is given in the array . Can you determine the number of ways of making change for  units using the given types of coins? For example, if , and , we can make change for  units in three ways: , , and .

  Given , , and , print the number of ways to make change for  units using any number of coins having the values given in .

Input Format

The first line contains two space-separated integers describing the respective values of  and .
  The second line contains  space-separated integers describing the respective values of  (the list of distinct coins available in infinite amounts).

Constraints

Each  is guaranteed to be distinct.
  Hints

Solve overlapping subproblems using Dynamic Programming (DP):
You can solve this problem recursively but will not pass all the test cases without optimizing to eliminate the overlapping subproblems. Think of a way to store and reference previously computed solutions to avoid solving the same subproblem multiple times.
  Consider the degenerate cases:
  How many ways can you make change for 0 cents?
  How many ways can you make change for > 0 cents if you have no coins?
  If you're having trouble defining your solutions store, then think about it in terms of the base case .
The answer may be larger than a -bit integer.
  Output Format

Print a long integer denoting the number of ways we can get a sum of  from the given infinite supply of  types of coins.

  Sample Input 0

4 3
1 2 3
Sample Output 0

4
Explanation 0

There are four ways to make change for  using coins with values given by :

  Thus, we print  as our answer.

  Sample Input 1

10 4
2 5 3 6
Sample Output 1

5
Explanation 1

There are five ways to make change for  units using coins with values given by :

  Thus, we print 5 as our answer.
*/

process.stdin.resume()
process.stdin.setEncoding('ascii')

let input_stdin = ''
let input_stdin_array = ''
let input_currentline = 0

process.stdin.on('data', data => {
  input_stdin += data
})

process.stdin.on('end', () => {
  input_stdin_array = input_stdin.split('\n')
  main()
})

function readLine() {
  return input_stdin_array[input_currentline++]
}

// ///////////// ignore above this line ////////////////////

function getWays(n, c, way = 0) {
  // Complete this function
  if (n <= 0) {
    return way
  }
  return getWays(n - c[0], c, ++way)
}

function main() {
  const n_temp = readLine().split(' ')
  const n = parseInt(n_temp[0])
  const m = parseInt(n_temp[1])
  const c = readLine().split(' ').map(Number)

  // console.log(countcoins(n, c))
  // Print the number of ways of making change for 'n' units using coins having the values given by 'c'
  // const ways = getWays(n, c)
}


function countcoins(t, o) {
  const operandsLength = o.length
  let solutions = 0

  function permutate(a, x) {
    console.log(a, x, t)
    // base case
    if (a === t) {
      solutions++
    }

    // recursive case
    else if (a < t) {
      for (let i = 0; i < operandsLength; i++) {
        if (i >= x) {
          permutate(o[i] + a, i)
        }
      }
    }
  }

  permutate(0, 0);
  return solutions;
}

// mit problems : https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-11.html#%_sec_Temp_52
// TODO https://www.hackerrank.com/contests/projecteuler/challenges/euler092/problem
// TODO https://www.hackerrank.com/contests/programming-interview-questions/challenges/balanced-delimiters
// function processData(input) {
//   const isClosing = char => ['}', ')', ']'].includes(char)
//   const getMatch => char => ({
//     '}' : '{',
//     ')': '(',
//     ']': '['
//   }[char])
//
//   // Enter your code here
//   console.log(input)
//   console.log(input.split('').reduce((acc, curr) => {
//     if (isClosing(curr)) {
//       acc.pop()
//     } else {
//       acc.push(curr)
//     }
//     return acc
//   }, true))
// }
//
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function (input) {
//   _input += input;
// });
//
// process.stdin.on("end", function () {
//   processData(_input);
// });
