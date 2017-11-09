// curl -s 'https://api.github.com/users/syzer/repos?per_page=100&page=1' | ramda -f r.cli.github.js -o csv
const R = require('ramda')
const isNotFork = R.where({ "stargazers_count": R.complement(R.equals(0)) })

module.exports = R.pipe(
  R.filter(isNotFork),
  R.project([ 'name', 'stargazers_count', 'html_url', 'language']),
  R.sortBy(R.prop('stargazers_count')),
  R.reverse,
  R.take(3)
)