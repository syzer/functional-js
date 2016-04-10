#!/usr/bin/env node
'use strict'



//TODO make it work above 32
const combinations = (n) => {

    var arr = [];
    for (var i = 0; i < (1 << n); i++) {
        var c = ''
        for (var j = 0; j < n; j++) {
            c += (i & (1 << j) ? '1' : '0')
        }
        arr.push(c)
    }
    return arr
}


function ToUint32(x) {
    return x >>> 0;
}

const newCOmb = (n) => {
    // n = ToUint32(n)
    var arr = [];
    for (var i = 0; i < Math.pow(2, 32); i++) {
        var c = ''
        for (var j = 0; j < n; j++) {
            c += (i & (1 >>> j) ? '1' : '0')
        }
        arr.push(c)
    }
    return arr
}

var oldComb = combinations(20)
console.log(oldComb.length)
console.log(oldComb.slice(100,110))

var newComb = newCOmb(32)
console.log(newCOmb.length)
console.log(newCOmb[0])