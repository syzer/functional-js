const fs = require('fs')
const { Left, Right, fromNullable } = require('./03-either')

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

module.exports = tryCatch

const login = () => {

}

const openSite = user => {
    if (user) {
        return render(user)
    } else {
        return login()
    }
}

// functional version
const openSite2 = user =>
    fromNullable(user)
        .fold(login, render)


const getDiscount = user => {
    if (user.premium) {
        return loadDiscount(user.preferences)
    } else {
        return defaultDiscount
    }
}

// functional version
const getDiscount2 = user =>
    (user.premium ? Right(user) : Left('no bonus'))
        .map(u => u.preferences)
        .fold(() => defaultDiscount, pref => loadDiscount(pref))


const getUserStreet = user => {
    const address = user.address

    if (adress) {
        const street = address.street
        if (street) {
            return street.name
        }
    }
    return 'no street'
}

// functional version
const getUserStreet2 = user =>
    fromNullable(user.addresses)
        .chain(a => fromNullable(a.street))
        .map(s => s.name)
        .fold(e => 'no street', n => n)

const parseDbUrl = cfg => {
    try {
        const c = JSON.parse(cfg)
        if (c.url) {
            return c.url.match(/posgres:/)
        }
    } catch (e) {
        return null
    }
}

// functional
const parseDbUrl2 = cfg =>
    tryCatch(() => JSON.parse(cfg))
        .chain(c => fromNullable(c.url))
        .fold(e => null, u => u.match(/posgres:/))
