const R = require('ramda')
const _ = require('lodash')
const { Either, Maybe } = require('ramda-fantasy')
const { Left, Right } = Either

const tax = R.curry((tax, price) => {
    if (!_.isNumber(price)) return Left(new Error("Price must be numeric"))

    return Right(price + (tax * price))
})

const discount = R.curry((dis, price) => {
    if (!_.isNumber(price)) return Left(new Error("Price must be numeric"))

    if (price < 10) return Left(new Error("discount cant be applied for items priced below 10"))

    return Right(price - (price * dis))
})

const addCaliTax = (tax(0.1))//10%

const apply25PercDisc = (discount(0.25))// 25% discount

const getItemPrice = (item) => Right(item.price)


const displayTotal = (total) => {
    console.log('Total Price: ' + total)
}

const logError = (error) => {
    console.error('Error: ' + error.message)
}

const eitherLogOrShow = Either.either(logError, displayTotal)

const saveDb = (item) => {
    console.log('saving items', item)
    return Right(item)
}

// api
const showTotalPrice = (item) => eitherLogOrShow(
    getItemPrice(item)
        .chain(apply25PercDisc)
        .chain(addCaliTax)
        .chain(saveDb)
)

let tShirt = { name: 't-shirt', price: 11 }
let pant = { name: 't-shirt', price: '10 dollars' } // error
let chips = { name: 't-shirt', price: 5 }           // less than 10 dollars error

// showTotalPrice(tShirt) // Total Is: 9.075
// showTotalPrice(pant)   // Error: Price must be numeric
// showTotalPrice(chips)  //Error: discount cant be applied for items priced below 10

const stuff = [
    { name: 't-shirt', price: 11 },
    { name: 't-shirt', price: 15 },
    { name: 't-shirt', price: '10 dollars' }, // string => error
    { name: 't-shirt', price: 5 } // less than 10 dollars error
]

R.map(showTotalPrice, stuff)