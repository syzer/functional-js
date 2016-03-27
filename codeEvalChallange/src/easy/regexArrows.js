// https://www.codeeval.com/open_challenges/203/submit/
/**
 * You have a string composed of the following symbols: '>', '<', and '-'. Your task is to find, count, and print to the output a number of arrows in the string. An arrow is a set of the following symbols: '>>-->' or '<--<<'.
 Note that one character may belong to two arrows at the same time. Such example is shown in the line #1.
 */
const countRightArrows = (str) => (str.match(/(?=>>-->)/g) || []).length
const countLeftArrows = (str) => (str.match(/(?=<--<<)/g) || []).length
const countArrows = (str) => countRightArrows(str) + countLeftArrows(str)

require('fs').readFileSync(process.argv[2]).toString().split('\n').forEach(line => {
    if (line === "") return
    console.log(countArrows(line))
})

