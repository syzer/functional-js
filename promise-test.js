/**
 * Created by syzer on 4/17/2014.
 */
const Q = require('q')
const fs = require('fs')

function fs_readFile(file, encoding) {
    const deferred = Q.defer()
    fs.readFile(file, encoding, (err, data) => {
        if (err) {
            deferred.reject(err)
        } // rejects the promise with `er` as the reason
        else {
            deferred.resolve(data)
        } // fulfills the promise with `data` as the value
    })
    return deferred.promise // the promise is returned
}
fs_readFile('index.html').then(console.log, console.error)

// chain multiple promises
function addAsync(a, b) {
    const deferred = Q.defer()
    // Wait 2 seconds and then add a + b
    setTimeout(() => {
        deferred.resolve(a + b)
    }, 2000)
    return deferred.promise
}

Q.all([
    addAsync(1, 1),
    addAsync(2, 2),
    addAsync(3, 3)
]).spread((result1, result2, result3) => {
    console.log(result1, result2, result3)
})
// logs "2 4 6" after approximately 2 seconds
// //////////////////////////////////////////////////////////////////////////////
/**
 * jquery promises
 */
const jsdom = require('jsdom')       // fake DOM!!!
const window = jsdom.jsdom().createWindow()
$ = require('jquery')(window)
function fooPromise() {
    const deferred = $.Deferred()
    setTimeout(() => {
        deferred.resolve('BAZINGA!')
    }, 2000)
    return deferred.promise()
}
fooPromise().then(
    value => {
        console.log(value) // Bazinga after 1 second
    },
    error => {
        console.log(error, 'we have an error')
    }
)

function getPost(id) {
    return $.getJSON('/posts/' + id).then((data, status, xhr) => {
        return data
    })
}

function getUser(id) {
    return $.getJSON('/users/' + id).then((data, status, xhr) => {
        return data
    })
}
// sequential
function authorForPost(id) {
    let postPromise = getPost(id),
        deferred = $.Deferred()

    postPromise.then(post => {
        const authorPromise = getUser(post.authorId)

        authorPromise.then(author => {
            deferred.resolve(author)
        })
    })

    return deferred.promise()
}
// parallel
function getTwoUsers(idA, idB) {
    let userPromiseA = getUser(idA),
        userPromiseB = getUser(idB)

    return $.when(userPromiseA, userPromiseB)
}
getTwoUsers(1002, 1008).then((userA, userB) => {
    $(render(userA)).appendTo('#users')
    $(render(userB)).appendTo('#users')
})

// parallel + sequential with WHEN
function getAuthorsForTwoPosts(idA, idB) {
    return $.when(authorForPost(idA), authorForPost(idB))
}

