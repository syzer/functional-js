process.stdin.resume()
process.stdin.setEncoding('ascii')

let input_stdin = ''
let input_stdin_array = ''
let input_currentline = 0

process.stdin.on('data', data => {ą
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

function getWays(n, c) {
  // Complete this function
}

function main() {
  const n_temp = readLine().split(' ')
  const n = parseInt(n_temp[0])
  const m = parseInt(n_temp[1])
  c = readLine().split(' ')
  c = c.map(Number)
  // Print the number of ways of making change for 'n' units using coins having the values given by 'c'
  const ways = getWays(n, c)
}
