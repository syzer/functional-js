#!/usr/bin/env node

const Rx = require('rx')

const newSubject = () => new Rx.Subject()

// Behavior have initial value.. like and Age vs Birthday
const result = new Rx.Observable.interval(1000)
    .do(e => console.log('doing', e))
    .map(e => Math.random())
    .multicast(newSubject, (shared) => {
        console.log('shared:', shared)
    })
    // .refCount()

const delayed = result.delay(500)
const merged = result.merge(delayed)
merged.subscribe(e => console.log(e))

// 0 => 1 : subscribe()
// 1 => 0 : unsubscribe()
//
// const observerA = {
//     onNext(x) {
//         console.log('A next ' + x)
//     },
//     onError(err) {
//         console.error('A err ' + err)
//     },
//     onCompleted() {
//         console.log('A done')
//     }
// }
//
// const subscriberA = observable.subscribe(observerA)
//
// const observerB = {
//     onNext(x) {
//         console.log('B next ' + x)
//     },
//     onError(err) {
//         console.error('B err ' + err)
//     },
//     onCompleted() {
//         console.log('B done')
//     }
// }
//
// setTimeout(function () {
//     const subscriberB = observable.subscribe(observerB)
// }, 2000)
//
// setTimeout(() => {
//     console.log('Observer b kicks in')
// }, 5000)
