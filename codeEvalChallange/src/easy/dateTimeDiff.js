'use strict';

const pad = (num) => num < 10 ? `0${num}` : `${num}`

const timeDiff = (dates) =>
    dates.map(date => {
        let d = new Date()
        d.setHours(date[0])
        d.setMinutes(date[1])
        d.setSeconds(date[2])
        return d
    }).reduce((a,b) => {
        const c = new Date(b-a)
        return [c.getUTCHours(), c.getMinutes(), c.getSeconds()]
    }).map(pad)
      .join(':')

const parseLine = (line) =>
    line.split(' ').sort().map(el => el.split(':'))

const run = (lines) => {
    return lines.split('\n').map(parseLine).map(timeDiff).join('\n')
}

module.exports.run = run