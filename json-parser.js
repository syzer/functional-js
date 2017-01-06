/**
 * Created by syzer on 14/2/24.
 */

// this is very very wrong
const isJsonString = function (str) {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

const jsonToCheck = '{ "Id": 1, "Name": "Coke" }'
const jsonValidToCheck = '{"firstName": "John", "lastName": "Smith","age: "25"}'
console.log('-----', isJsonString(jsonToCheck))
console.log(isJsonString(jsonValidToCheck)) // !!!

const tryParseJSON = function (jsonString, err) {
    try {
        const o = JSON.parse(jsonString)
        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns 'null', and typeof null === "object",
        // so we must check for that, too.
        if (o && typeof o === 'object' && o !== null) {
            return o
        }
    } catch (e) {
        if (err !== undefined) {
            err(e)
        }
    }
    return false
}

const err = function (e) {
    console.log('EIROR', JSON.stringify(e))
}

console.log('try parse JSON', tryParseJSON(jsonToCheck).toString())
console.log('try parse JSON', tryParseJSON(jsonValidToCheck, err).toString())
