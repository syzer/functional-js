const _ = require('lodash')
const phoneShowers = [{showerID: 1, data: 2}, {showerID: 2}, {showerID: 3, data: 2}]
const missingIds = [2, 4]
const user = 'me'
const device = 'fisrtDevice'

function logArgs(data) {
    console.log(arguments)
}
const apiWrapper = {createExtraction: logArgs}
const test = _.xor(
    phoneShowers
        .filter(shower => {
            return _.contains(missingIds, shower.showerID)
        }).map(extraction => {
            apiWrapper.createExtraction(user, device, extraction)
            return extraction.showerID
        }), missingIds
)

console.log(test)

var allMissing = _.curryRight((missingIds, phoneShowers, user, device) => {
    return phoneShowers
        .filter(shower => {
            return _.contains(missingIds, shower.showerID)
        }).map(extraction => {
            apiWrapper.createExtraction(user, device, extraction)
            return extraction.showerID
        })
})

const allMissingForUserDevice = allMissing(phoneShowers, user, device)

var test2 = _.flow(allMissingForUserDevice, _.xor, _.size)

console.log(test2(missingIds))

// /////////////////////////////////////////

const pushToServerAndGetId = function (user, device, extraction) {
    apiWrapper.createExtraction(user, device, extraction)
    return extraction.showerID
}
const pushDataGetId = _.curry(pushToServerAndGetId)(user, device)

function serverMissingId(shower) {
    return _.contains(missingIds, shower.showerID)
}

var allMissing = function (phoneShowers, missingIds) {
    return phoneShowers
        .filter(serverMissingId)
        .map(pushDataGetId)
}

const allMissingPhoneShowers = _.curry(allMissing)(phoneShowers)

var test2 = _.flow(allMissingPhoneShowers, _.xor)

console.log(test2(missingIds))

