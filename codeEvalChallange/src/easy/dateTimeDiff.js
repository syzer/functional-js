'use strict';

var str = '14:01:57 12:47:11'
var arr = str.split(' ').sort().map(el => el.split(':'))

var a = new Date()
a.setHours(arr[0][0])
a.setMinutes(arr[0][1])
a.setSeconds(arr[0][2])

var b = new Date()
b.setHours(arr[1][0])
b.setMinutes(arr[1][1])
b.setSeconds(arr[1][2])

var c = new Date(b-a)
c.getSeconds()
c.getMinutes()
var pad = (num) => num < 10 ? `0${num}` : num
pad(c.getUTCHours())


const parseLine = (line) => {
    let went = false
    let c = line.indexOf('C'),
        _ = line.indexOf('_')
    lastPos = lastPos || _ //T ODO
    line = line.split('')

    if (-1 !== c) {
        went = true
        line.splice(c, 1, go(c))
    }
    if (-1 !== _ && !went) {
        line.splice(_, 1, go(_))
    }
    return line.join('')
}

const run = (lines) => {
    return lines.split('\n').map(parseLine).join('\n')
}

module.exports.run = run