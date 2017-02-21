// much python
function * items(o) {
    for (let k in o) {
        yield [k, o[k]]
    }
}

for (let [k, v] of items({ p: 3, k: 5, r: 6 })) {
    console.log(k, v)
}

// p 3
// k 5
// r 6
