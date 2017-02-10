// http://jlongster.com/Taming-the-Asynchronous-Beast-with-CSP-in-JavaScript

const csp = require('js-csp')
const { chan, take, put, go, timeout } = csp

// timeout returns a channel that closes after a specific amount of time. When a channel closes,
// all blocked takes on it are resumed with the value of csp.CLOSED, and all blocked puts are resumed with false.

const ch = chan()

go(function*() {
    let val
    while ((val = yield take(ch)) !== csp.CLOSED) {
        console.log('ch1 ' + val)
    }
})

go(function*() {
    yield put(ch, 10)
    yield take(timeout(1000))
    yield put(ch, 20)
    ch.close()
})

go(function*() {
    while (yield put(ch, 11)) {
        yield take(timeout(250))
    }
})

go(function*() {
    while (yield put(ch, 22)) {
        yield take(timeout(300))
    }
})

go(function*() {
    while (yield put(ch, 'done')) {
        yield take(timeout(1000))
    }
})
