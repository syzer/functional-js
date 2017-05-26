const _ = require('lodash')
const cities = require('./cities.json')

const test = _(cities)
.filter(c => c.population >= 5000000)
.countBy(c => c.country)
.toPairs()
// .map(c => _.zipObject(['country', 'numOfCities'], c))
.map(([country, numOfCities]) => ({ country, numOfCities }))
.orderBy(c => c.numOfCities, 'desc')
.take(5)
.value()

console.log(test)


const greatherThan = _.curryRight(_.gte)
const populationGreatherThan = threshold => _.conforms({ population: greatherThan(threshold) })
const zipObject = _.curry(_.zipObject)

const test2 = _(cities)
.filter(populationGreatherThan(5000000))
.countBy('country')
.toPairs()
.map(zipObject(['country', 'numOfCities']))
.orderBy('numOfCities', 'desc')
.take(5)
.value()

console.log(test2)
