// const Box = require('./01-boxing')


const Right = x => ({
    map: f => Right(f(x)),
    tap: () => `Right(${x})`,
    inspect: () => `Right(${x})`,
    // unbox
    fold: (f, g) => g(x),
    chain: f => f(x),
    ap: x2 => x2.map(x) // test
})

const Left = x => ({
    map: f => Left(x),
    tap: () => `Left(${x})`,
    inspect: () => `Left(${x})`,
    fold: (f, g) => f(x),
    chain: f => Left(x),
    ap: x2 => Left(x) // test
})

const Either = Right || Left
Either.of = x => Either(x)

const findColor = name => ({
    red: '#ff4444',
    blue: '#3b5998',
    yellow: '#ff68f'
})[name]

const result = findColor('red').slice(1).toUpperCase()
// console.log(result)
// const result = findColor('black').slice(1).toUpperCase()
// err

const fromNullable = x => x != null ? Right(x) : Left(null)

const findColor2 = name =>
    fromNullable({
        red: '#ff4444',
        blue: '#3b5998',
        yellow: '#ff68f'
    }[name])

const result2 = findColor2('green')
    .map(c => c.slice(1))
    .fold(e => 'no color', c => c.toUpperCase())

// console.log(result2)
// 'no color' ... no err

// const testRight = Right(3).map(x => x + 1).map(x => x + 666)
// testRight.tap()

module.exports = {
    fromNullable,
    Left,
    Right,
    Either
}
