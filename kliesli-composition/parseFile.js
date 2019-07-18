const fs = require('fs')
const { promisify } = require('util')
// const fileName = './empty.md'
// const fileName = './non-existing.md'
const fileName = './readme.md'


const read = name =>
  fs.readFile(name, 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)

    if (data.length < 1) {
      console.error('File is empty!')
      return
    }

    console.log(words(data))
  })

const words = str =>
  str.split(' ').length

// const result = read(fileName)
// console.log(result)

// const fr = new FileReader(file)
// fr.isEmpty()

// problems
// 1. Error handling
// 2. every class has custom API
// 3. composition of classes hard
// 4. extensibility imposible when more that 2 classes involved

// // First try with promises
const readFileAsync = promisify(fs.readFile)

const readAsync = name =>
  readFileAsync(name, 'utf-8')
    .then(data => {
      if (data.length < 1) {
        throw Error('File is empty!')
      }
      return words(data)
    })
    .catch(console.error)


// const resultAsync = readAsync(fileName)
// resultAsync
//   .then(console.log)
//   .catch(console.error)

// // Good parts:
// // 1. error handling ok (unless somebody eate an error
// // 2. one api (then, catch)
// // 3. composiiton ok : we can compose sync and async api (we skip generators for now :D)
// // 4. extensibility ok (ex: .then(console.log))
//
// // Bad parts:
// // 1. u need file system to test
// // 2. everybody can handle error diffrently
// // 3. you might have a catch multiple times
//
// use pipeP
//

// [a] => [a] => [a] => Right ok
//       \\
//        [Error] => [Error] => [Error] => Left : error

const { tap, pipeP, memoizeWith, identity } = require('ramda')

// we can put name functions anywhere that makes compoosition easier
// data cannot be changed AKA immutability
const validateNotEmpty = data => {
  if (data.length < 1) {
    return Promise.reject(Error('File is empty!'))
    // throw Error('File is empty!')  // this works too!
  }

  // return {} // this would break all client code
  // return data // nothing forbid you from returning
}

const readRamda = pipeP(
  name => readFileAsync(name, 'utf-8'),
  tap(validateNotEmpty),
  words
)
//
// const resultRamda = readRamda(fileName)
// resultRamda
//   .then(console.log)
//   .catch(console.error) // better because its once

// // TODO Either monad
// // TODO data.task

// Could be better : error handling
// 'ala'+ 'goes here'

//
// K Y M I


// I - Identity
// Y - combinator : memoizeWith
// Singleton might be one option
class Once {
  constructor(data) {
    this.data = data
    this.wasItMultiplied = false // TODO singleton (Aka static)
    // TODO hashMap implementation{}, [2, 4]
  }

  // @memoizeWith(e => e)
  multiply(num) {
    if (!this.wasItMultiplied) {
      this.data = this.data.map(e => e * num)
      console.log('this takes 5 sec')
      this.wasItMultiplied = num
    }
    return this
  }

  // Not fluid
  getData() {
    return this.data
  }

  // html()
  // toJson()
}

const once = new Once([1, 2, 3, 4])

// const resultMultiply = once.multiply(2).getData()
// console.log(resultMultiply)
//
// const twice = new Once([1, 2, 3, 4])
// const resultMultiply2 = twice.multiply(2).multiply(4).getData()
// console.log(resultMultiply2)

// Equivalent
const multiply = arr =>
  memoizeWith(identity, num => {
    console.log('this takes 5 sec')
    return arr.map(e => e * num)
  })

const onceF = multiply([1, 2, 3, 4])
const resultF = onceF(2)
console.log(resultF)

const twiceF = onceF(2)
console.log(twiceF)


// K-combinator


