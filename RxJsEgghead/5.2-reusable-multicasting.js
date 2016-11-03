#!/usr/bin/env node

const Rx = require('rx')

// after 5 => complete
const observable = new Rx.Observable.interval(1000).take(5)
    .do(e => console.log)
    .multicast(new Rx.Subject())
    .refCount()


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

const subscriberA = observable.subscribe(observerA)

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

setTimeout(function () {
    const subscriberB = observable.subscribe(observerB)
}, 2000)

setTimeout(() => {
    console.log('Observer b kicks in')
}, 5000)

//TODO refCount unsubscribe