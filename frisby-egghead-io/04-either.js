const { Left, Right, fromNullable } = require('./03-either')

const fs = require('fs')

const tryCatch = f => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
}

const getPort = () =>
    tryCatch(() => fs.readFileSync('config.json'))
        .chain(c => tryCatch(() => JSON.parse(c)))
        .fold(e => 3000, c => c.port())

const result = getPort()
console.log(result);
