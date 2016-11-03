#!/usr/bin/env node

const Rx = require('rx')

const newSubject = () => new Rx.Subject()


// shared will be used to merge back other observable
const result = new Rx.Observable.interval(1000).take(6)
    .do(e => console.log('doing', e))
    .map(e => Math.random())
    .multicast(newSubject, (shared) =>
        shared.merge(shared.delay(500))
    )

result.subscribe(e => console.log(e))
