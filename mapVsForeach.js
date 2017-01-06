// 42% faster!!!
_ = require('lodash')
const data = _.map(_.range(10000), el => {
    const obj = {}
    obj[el] = 'wat'
    obj[111] = 'man'
    obj[666] = '!'
    obj.name = 'test'
    return obj
})

let data2 = _.cloneDeep(data)

function isNumeric(num) {
    return !_.isNaN(parseInt(num))
}

console.time('map')
data2 = data2.map((article, i) => {
    return _.omit(article, (value, key) => {
        return isNumeric(key)
    })
})
console.timeEnd('map')

console.time('forEach')
data.forEach((article, i) => {
    data[i] = _.omit(article, (value, key) => {
        return isNumeric(key)
    })
})
console.timeEnd('forEach')
console.log(data[0])

// ////////////////////////////////////////////
function filterActiveBad(words) {
    const filtered = []
    words.forEach(word => {
        if (!word.completed) {
            filtered.push(word.name)
        }
    })
    return filtered
}

function filteredActive(words) {
    return words
        .filter(word => {
            return !word.completed
        })
        .map(word => {
            return word.name
        })
}
