// @see https://www.hackerrank.com/challenges/bon-appetit
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

function bonAppetit(n, k, b, ar) {
  // Complete this function
}

function main() {
  const n_temp = readLine().split(' ')
  const n = parseInt(n_temp[0])
  const k = parseInt(n_temp[1])
  ar = readLine().split(' ')
  ar = ar.map(Number)
  const b = parseInt(readLine())
  const result = bonAppetit(n, k, b, ar)
  process.stdout.write(String(result) + '\n')
}
