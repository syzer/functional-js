const pipe = functions => data =>
    functions.reduce((value, func) => func(value), data)

const pipeline = pipe([
    x => x * 2,
    x => x / 3,
    x => x > 5,
    b => !b
])

console.log(pipeline(5))
console.log(pipeline(20))

const funcs = [
    (xs, cb) => cb(xs * 2),
    (xs, cb) => cb(xs / 3),
    (xs, cb) => cb(xs > 5)
]
const next = data => {
    console.log('data', data)
}
funcs.reduce((xs, f) => f(xs, next), [1, 2, 3])
