#!/usr/bin/env node

// https://www.hackerrank.com/challenges/cavity-map/problem
const R = require('ramda')
const fs = require('fs')
const colors = require('colors')
const { clone, pipe: _, join } = R

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

const isNotEmpty = arr => arr.length
const findBiggest = arr => arr.reduce((curr, next) => curr > next ? curr : next)
const isOnEdge = (arr, i, j) =>
  typeof arr[i - 1] === 'undefined'
  || typeof arr[i + 1] === 'undefined'
  || typeof arr[i + 1][j + 1] === 'undefined'
  || typeof arr[i - 1 ][j - 1] === 'undefined'
  || typeof arr[i][j + 1] === 'undefined'

const getCrossNeighbours = (arr, i, j) => {
  const neighbourhood = []
  if (isOnEdge(arr, i, j)) {
    return []
  }

  neighbourhood.push(arr[i][j + 1])
  neighbourhood.push(arr[i][j - 1])
  neighbourhood.push(arr[i - 1][j])
  // neighbourhood.push(arr[i - 1][j - 1])
  // neighbourhood.push(arr[i - 1][j + 1])
  neighbourhood.push(arr[i + 1][j])
  // neighbourhood.push(arr[i + 1][j - 1])
  // neighbourhood.push(arr[i + 1][j + 1])

  return neighbourhood
}

function cavityMap(rows) {
  const grid = rows.map(e => e.split(/ |/g).map(Number))

  return grid.map((r, i) =>
    r.map((e, j) => {
      const neighbours = getCrossNeighbours(grid, i, j)
      return isNotEmpty(neighbours) && findBiggest(neighbours) < e
        ? 'X'
        : e
    }))
}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH)
  // const ws = fs.createWriteStream()
  const n = parseInt(readLine(), 10)
  let grid = []
  let withSpaces = false

  for (let i = 0; i < n; i++) {
    const gridItem = readLine()
    withSpaces = / /.test(gridItem) // gridItem
    grid.push(gridItem)
  }

  let result = cavityMap(grid)
  result = result.map(r => r.join(withSpaces ? ' ' :''))
  console.log(result.join("\n") + "\n")
}
