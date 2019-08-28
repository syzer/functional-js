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

function readLine() {
  return inputString[currentLine++]
}

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
  const results = arr.reduce((acc, curr, i, arr) => {
    if (acc.min >= curr) {
      acc.min = curr
    }
    if (acc.max <= curr) {
      acc.max = curr
    }
    acc.sum += curr
    return acc
  }, {
    min: 1000000000,
    max: 0,
    sum: 0
  })
  console.log(results.sum - results.max, ' ', results.sum - results.min)
}

function main() {
  const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10))

  miniMaxSum(arr)
}
