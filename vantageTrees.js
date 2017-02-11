const n = require('natural')
const fs = require('fs')
const VPTree = require('mnemonist/vp-tree')
const R = require('ramda')
const { map, find } = R

const words = fs
    .readFileSync(__dirname + '/google-10000-english/20k.txt', 'utf8')
    .split('\n')

const levenshtein = (a, b) => n.LevenshteinDistance(a, b)
// JaroWinklerDistance dont work
// const jaroWinkler = (a, b) => Number((Math.pow(1 / n.JaroWinklerDistance(a, b), 4)/8 - 0.9).toFixed(0))

const tree = new VPTree(levenshtein, words)

const correctWords = ['big', 'query', 'hadoop', 'lambda', 'calculus']

// misspelled words
;['bigg', 'quey', 'radop', 'lamba', 'calculs']
    .map(e => tree.nearestNeighbors(4, e))
    .map(map(({ item }) => item))
    .filter(find(w => correctWords.includes(w)))

// AKA autocomplete
// all words found