Symbol.asyncIterator = Symbol.asyncIterator || Symbol('asyncIterator')

const delay2sec = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 2000)
})

// this will come soon
async function * newResults() {
  await delay2sec()
  yield delay2sec()
  yield 2
  yield 3
}
//
async function iterate() {
  for await (let i of newResults()) {
    console.log(i)
  }
}
//
// iterate()
