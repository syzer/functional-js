// maybe result

// this need try catch
function query(selector) {
    return document.querySelectorAll(selector)
}

const attemptWith = _.curry(_.attempt, 2)

// stop throwing errors
const elements = attemptWith(query)

// maybe result
function emptyOnError(fn) {
    return function (/* args */) {
        if (_.isError(fn(arguments[0]))) {
            return []
        }
        return fn(arguments[0])
    }
}

const elWithoutErr = emptyOnError(elements)

elWithoutErr('li')
