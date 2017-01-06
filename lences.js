/**
 * Created by syzer on 14/1/23.
 */
// lences used to modify immutable data structure
function lens(get, set) {
    const f = function (a) {
        return get(a)
    }
    f.set = set
    f.mod = function (f, a) {
        return set(a, f(get(a)))
    }
    return f
}

const first = lens(
    a => {
        return a[0]
    },
    (a, b) => {
        return [b].concat(a.slice(1))
    }
)

console.log(first([1, 2, 3])) // outputs 1
console.log(first.set([1, 2, 3], 5)) // outputs [5, 2, 3]

function tenTimes(x) {
    return x * 10
}

console.log(first.mod(tenTimes, [1, 2, 3]))// oputipts [10, 2, 3]

