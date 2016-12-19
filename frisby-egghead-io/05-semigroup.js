// example semigroup
// AKA concatenable
// with assiociativity
const res = 'a'.concat('b').concat('c')

// assiociativity a + (b + c) = (a + b) + c
const res2 = [1, 2].concat([3, 4]).concat([5, 6])
const res3 = [1, 2].concat([3, 4].concat([5, 6]))

// console.log(res, res2, res3)

const Sum = x => ({
    x,
    concat: ({x: y}) => Sum(x + y),
    tap: () => `Sum(${x})`,
    inspect: () => `Sum(${x})`
})

const res4 = Sum(1).concat(Sum(2)).tap()
// console.log(res4)
// Sum(3)

// like Sum  but with &&
const All = x => ({
    x,
    concat: ({x: y}) => All(x && y),
    tap: () => `All(${x})`
})

// true && false => false
const res5 = All(true).concat(All(false)).tap()
// console.log(res5)
// All(false)

// flatten First
const First = x => ({
    x,
    concat: _ => First(x),
    tap: () => `First(${x})`
})

const res6 = First('test').concat(First('second')).tap()
// console.log(res6); // second is thrown away
// First(test)

module.exports = {
    All,
    Sum,
    First
}