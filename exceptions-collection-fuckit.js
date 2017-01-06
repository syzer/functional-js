/**
 * Created by syzer on 14/1/23.
 */
// http://andydriver.tumblr.com/page/2

// map and filter
function map(f, a) {
    return a.length ? [].concat(f(a[0]), map(f, a.slice(1))) : []
}

function filter(f, a) {
    return map(x => {
        return f(x) ? x : []
    }, a)
}

const even = function (x) {
    return x % 2 == 0
}

console.log(filter(even, [1, 2, 3, 4]))

/**
 * allows you to map a function to a collection and not worry about handling exceptions thrown in the function.
 *
 * @param fn
 * @returns {*}
 */
function tryo(fn) {
    let res = null
    try {
        res = fn()
    } catch (e) {
        res = null
    }
    return maybe(res)
}

function thrower(x) {
    if (x == 2) {
        throw new Error('An exception')
    }
    return x
}

console.log([1, 2, 3].map(i => {
    return tryo(() => {
        return thrower(i)
    }).getOrElse('fail')
}))

const book = db.query('SELECT * FROM book WHERE id = 1')

function printTitle(book) {
    console.log(book.title)
}

maybe(book).map(printTitle)
