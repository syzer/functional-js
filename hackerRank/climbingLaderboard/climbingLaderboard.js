'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
})

function readLine() {
  return inputString[currentLine++];
}

function unique(arr) {
  return Array.from(new Set(arr))
}

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
  const scorez = unique(scores)
  let lastScorez = 0
  let alicePlace = 0

  return alice
    .reverse()
    .map(aliceScore => {
      alicePlace = lastScorez
      while (scorez[lastScorez] > aliceScore) {
        lastScorez++
        alicePlace++
      }

      return alicePlace + 1
    })
    .reverse()
  // 0.3s

  // 49s
  // const scorez = unique(scores)
  // return alice.map(aliceScore =>
  //   scorez
  //      .filter(score => score > aliceScore)
  //     .length + 1
  // )
}

function main() {
  const ws = process.env.OUTPUT_PATH
    ? fs.createWriteStream(process.stdout)
    : process.stdout

  const scoresCount = parseInt(readLine(), 10);

  const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

  const aliceCount = parseInt(readLine(), 10);

  const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

  let result = climbingLeaderboard(scores, alice);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
