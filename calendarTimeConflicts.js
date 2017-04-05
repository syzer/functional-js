// 05.04.2017

const _ = require('lodash')
const assert = require('assert')

const dates = [
    { start: '2017-04-05T16:05:22.201Z', end: '2017-04-05T16:10:22.201Z' },
    { start: '2018-04-15T16:05:22.201Z', end: '2018-04-16T16:10:22.201Z' },
    { start: '2017-04-05T16:06:22.201Z', end: '2017-04-05T16:10:22.201Z' },
    { start: '2018-04-15T16:05:22.201Z', end: '2018-04-16T16:10:22.201Z' },
].map(({ start, end }) => ({
    start: new Date(start), end: new Date(end)
}))

const sortedDates = dates.sort((a, b) => a.start - b.start)

const pickDates = sortedDates.reduce((acc, curr) => {
    if (curr.start < (_.last(acc) && _.last(acc).end)) {
        console.log('skipping', curr.start)
        return acc
    }

    acc.push(curr)
    return acc
}, [])

pickDates
// sortedDarstes