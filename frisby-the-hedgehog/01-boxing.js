const Box = x => ({
    map: f => Box(f(x)),
    tap: () => `Box(${x})`,
    inspect: () => `Box(${x})`,
    unBox: () => x,
    fold: f => f(x),
    // might be buggy
    chain: f => f,
    ap: b2 => b2.map(x)
})
Box.of = x => Box(x)


const nextCharFromString = str =>
    Box(str)
        .map(s => s.trim())
        .map(s => parseInt(s))
        .map(s => s + 1)
        .map(String.fromCharCode)

nextCharFromString(' 65  ').tap()
// Box('B')

nextCharFromString(' 65  ').unBox()
// B

module.exports = Box
module.exports.Box = Box

