#!/usr/bin/env node

const Rx = require('rx')

// Behavior have initial value.. like and Age vs Birthday
const shared = new Rx.Observable.interval(1000)
    .do(e => console.log)
    // .publish()    // multicast + subject
     // multicast + replay subject
    // .publishBehavior('initial') // multicast + replay subject
    // .publishLast() // for late subscribers
    .share() // publish + refcount
    // .refCount()

// 0 => 1 : subscribe()
// 1 => 0 : unsubscribe()

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

const subscriberA = shared.subscribe(observerA)

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
    const subscriberB = shared.subscribe(observerB)
}, 2000)

setTimeout(() => {
    console.log('Observer b kicks in')
}, 5000)

//TODO refCount unsubscribe