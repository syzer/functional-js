function* queryAll() {
    return Promise.all([
        'Basel',
        'Zurich'
    ].map(city =>
        query(city)
    ))
}

function query(city) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('debug resolved')
            res(`Awesome ${city}`)
        }, 10)
    })
}

queryAll().next().value.then(console.warn)
// console.log(queryAll().next().done) // => true with return
// console.log(queryAll().next().done) // => false with yeild