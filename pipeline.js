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