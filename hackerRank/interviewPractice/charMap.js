// write charMap with occurences
// english alphabet
// case in sensetive
// const input = 'Awesome'
const input = '123 Hi'
const output = charMap(input)

console.log(output)

function charMap(input) {
  return input
    .toLowerCase()
    .split('')
    // could also charCodeAt fn
    .filter(char => char >= 'a' && char <= 'z')
    .reduce((acc, char) => {
      acc[char] = acc[char] || 0
      acc[char]++
      return acc
    }, {})
}