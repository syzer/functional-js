/**
 * Created by syzer on 7/8/2014.
 */
const m = require('mori')
console.log('running')

const MILION = 1000000
let runs = []

const sum = function (a, b) {
    return a + b
}

for (var j = 0; j < 10; j++) {
    s = new Date()
    var v = m.vector()
    for (var i = 0; i < MILION; i++) {
        if (i % 32 === 0) {
            v = m.conj(v, Math.random())
        } else {
            v = m.conj(v, i)
        }
    }
    var el = (new Date()) - s
    runs.push(el)
    console.log('persisten vector conj' + m.count(v) + ' items' + el + ' ' + m.reduce(sum, 0, v))
}
console.log(runs.reduce(sum, 0) / 10)

runs = []
for (var j = 0; j < 10; j++) {
    s = new Date()
    let mv = m.mutable.thaw(m.vector())            // thaw
    for (var i = 0; i < MILION; i++) {
        if (i % 32 === 0) {
            mv = m.mutable.conj(mv, Math.random())
        } else {
            mv = m.mutable.conj(mv, i)
        }
    }
    var v = m.mutable.freeze(mv)
    var el = (new Date()) - s
    runs.push(el)
    console.log('MUTABLE vector conj' + m.count(v) + ' items' + el + ' ' + m.reduce(sum, 0, v))
}
console.log(runs.reduce(sum, 0) / 10)
