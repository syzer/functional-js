const Rx = require('rx')

const observable = Rx.Observable.interval(500).take(5)

const observerA = {
    onNext(x) {
        console.log('A next ' + x)
        // observerB.next(x)
    },
    onError(err) {
        console.error('A err ' + err)
    },
    onCompleted() {
        console.log('A done ')
    }
}

observable.subscribe(observerA)

const observerB = {
    onNext(x) {
        console.log('B next ' + x)
    },
    onError(err) {
        console.error('B err ' + err)
    },
    onCompleted() {
        console.log('B done ')
    }
}

setTimeout(() => {
    observable.subscribe(observerB)
}, 1000)
