const parse = (radix) => (num) => Number.parseInt(num, radix)
const add = (a, b) => a + b

const toHexNum = (str) => str.split(' ')
    .map(parse(16))
    .reduce(add)

const toBinNum = (str) => str.split(' ')
    .map(parse(2))
    .reduce(add)

const parseLine = (line) => line
    .split('|')
    .map(str => str.trim())
    .reduce((left, right) =>
        toHexNum(left) > toBinNum(right) ?
            'False' :
            'True'
    )

module.exports.run = (input) => input
    .split('\n')
    .map(line => line ? parseLine(line) : '')
    .join('\n')
