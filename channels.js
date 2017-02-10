const csp = require('js-csp')
const { chan, take, put, go, timeout } = csp

const ch = chan()

go(function*() {
    let val
    while ((val = yield take(ch)) !== csp.CLOSED) {
        console.log('ch1 ' + val)
    }
})

go(function*() {
    yield put(ch, 1)
    yield take(timeout(1000))
    yield put(ch, 2)
    ch.close()
})

go(function*() {
    while (yield put(ch, 1)) {
        yield take(timeout(250))
    }
})

go(function*() {
    while (yield put(ch, 2)) {
        yield take(timeout(300))
    }
})

go(function*() {
    while (yield put(ch, 'done')) {
        yield take(timeout(1000))
    }
})
