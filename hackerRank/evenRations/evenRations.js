#!/usr/bin/env node

const R = require('ramda')
const fs = require('fs')
const colors = require('colors')
const { clone, clamp, pipe: _, tap, join } = R

process.stdin.resume()
process.stdin.setEncoding('utf-8')

let inputString = ''
let currentLine = 0

process.stdin.on('data', inputStdin => {
  inputString += inputStdin
})

process.stdin.on('end', _ => {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''))

  main()
})

const readLine = () =>
  inputString[currentLine++]

const notEven = e => e % 2 !== 0
const even = e => e % 2 === 0

// DEBUG
const from = 0
const to = 1000
const firsts = R.take(to)

const addColor = pos => arr => {
  arr = arr.map((e, i) => notEven(e) && i !== pos ? String(arr[i]).blue : e)
  arr[pos] = String(arr[pos]).red
  return arr
}
const debugB = pos => arr => _(clone, firsts, addColor(pos), join(' '))(arr)
// DEBUG OFF

// Complete the fairRations function below.
function fairRations(B, breadGiven) {

  const firstNotEven = B.findIndex(notEven)

  if (firstNotEven === -1) {
    return breadGiven
  }

  if (firstNotEven === B.length - 1) {
    return 'NO'
  }

  if (breadGiven < to && breadGiven > from) {
    console.log(`breadGiven:`, breadGiven)
    console.log(debugB(firstNotEven)(B))
  }

  if (even(B[firstNotEven + 1]) && notEven(B[firstNotEven + 2])) {
    B[firstNotEven] += 1
    B[firstNotEven + 1] += 2
    B[firstNotEven + 2] += 1
    return fairRations(B, breadGiven + 4)
  }

  B[firstNotEven] += 1
  B[firstNotEven + 1] += 1

  return fairRations(B, breadGiven +2)
}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH)
  // const ws = fs.createWriteStream()
  const N = parseInt(readLine(), 10)
  const B = readLine().split(' ').map(BTemp => parseInt(BTemp, 10))

  let result = fairRations([...B], 0)
  console.log(result + '\n')
  // ws.write(result + "\n")
  // ws.end()
  // ws.pipe(process.stdout)
}
