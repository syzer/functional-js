Number.prototype.times = function (fn) {
    const r = []
    for (let i = 0; i < this; i++) {
        r.push(fn(i))
    }
    return r
}

function combinations(n) {
    return (1 << n).times(i => {
        let str = ''
        str += n.times(j =>
            (i & 1 << j) ? '1' : '0'
        )
        return str
    })
}

// NOT USED
function combinations(str) {
    const fn = function (active, rest, a) {
        if (!active && !rest) {
            return
        }
        if (!rest) {
            a.push(active)
        } else {
            fn(active + rest[0], rest.slice(1), a)
            fn(active, rest.slice(1), a)
        }
        return a
    }
    return fn('', str, [])
}
