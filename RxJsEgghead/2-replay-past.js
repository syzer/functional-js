const Rx = require('rx')

// All possible events
// window size from end
const subject = new Rx.ReplaySubject(Number.POSITIVE_INFINITY, 1000)

const observerA = {
    onNext(x) {
        console.log('A next ' + x)
    },
    onError(err) {
        console.error('A err ' + err)
    },
    onCompleted() {
        console.log('A done')
    }
}

subject.subscribe(observerA)

const observerB = {
    onNext(x) {
        console.log('B next ' + x)
    },
    onError(err) {
        console.error('B err ' + err)
    },
    onCompleted() {
        console.log('B done')
    }
}

// this controls others.. not reactive
setTimeout(() => subject.onNext(1), 500)
setTimeout(() => subject.onNext(2), 1000)
setTimeout(() => subject.onNext(3), 1500)

setTimeout(() => {
    console.log('Observer b kicks in')
    // new subscriber.. he will replay all events in buffer
    subject.subscribe(observerB)
}, 2000)