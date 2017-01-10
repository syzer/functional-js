/**
 * Created by syzer on 10/22/2014.
 */
// http://fr.umio.us/favoring-curry/
// Haskell Curry
const R = require('ramda')
const _ = require('lodash')
const print = console.log

_.map(['1.1', '2.2', '3.3'], parseFloat)           // => [1.1, 2.2, 3.3]
const wrong = _.map(['1', '2', '3'], parseInt)       // => [1, NaN, NaN]
R.map(parseFloat, ['1.1', '2.2', '3.3'])           // => [1.1, 2.2, 3.3]
const right = R.map(parseInt, ['1', '2', '3'])       // => [1, 2, 3]
print(wrong, right)

/**
 * PARTIAL APPLICATION
 */

// uncurried version
const formatName1 = function (first, middle, last) {
    return first + ' ' + middle + ' ' + last
}
const johnPaulJones = formatName1('John', 'Paul', 'Jones')
console.log(johnPaulJones) // => 'John Paul Jones' // (Ah, but the musician or the admiral?)

const johnPaul = formatName1('John', 'Paul')
console.log(johnPaul) // => 'John Paul undefined'); !!!! sic

// so better use curried version
const formatNames2 = R.curry((first, middle, last) => {
    return first + ' ' + middle + ' ' + last
})

const johnPaul2 = formatNames2('John', 'Paul')
console.log(johnPaul2(''))                                 // John Paul
console.log(johnPaul2('Jones'))                            // John Paul Jones
print(['Jones', 'Stevens', 'Ziller'].map(johnPaul2))      // [ 'John Paul Jones', 'John Paul Stevens', 'John Paul Ziller' ]

// Plain JS:
const add = function (a, b) {
    return a + b
}
const numbers = [1, 2, 3, 4, 5]
const sum = numbers.reduce(add, 0)
print(sum) // 15

const sum2 = R.reduce(add, 0, numbers)           // REDUCE IS CURRIED
print(sum2)   // 15
// what about reusing to other than numbers?

// total:: [Number] -> Number
const total = R.reduce(add, 0) // returns a function
print(total(numbers))

console.log('// ///////////////////////////////////////////////////////////////////////////////////////')

const data = {
    result: 'SUCCESS',
    interfaceVersion: '1.0.3',
    requested: '10/17/2013 15:31:20',
    lastUpdated: '10/16/2013 10:52:39',
    tasks: [
        {
            id: 104, complete: false, priority: 'high',
            dueDate: '2013-11-29', username: 'Scott',
            title: 'Do something', created: '9/22/2013'
        },
        {
            id: 105, complete: false, priority: 'medium',
            dueDate: '2013-11-22', username: 'Lena',
            title: 'Do something else', created: '9/22/2013'
        },
        {
            id: 107, complete: true, priority: 'high',
            dueDate: '2013-11-22', username: 'Mike',
            title: 'Fix the foo', created: '9/22/2013'
        },
        {
            id: 108, complete: false, priority: 'low',
            dueDate: '2013-11-15', username: 'Punam',
            title: 'Adjust the bar', created: '9/25/2013'
        },
        {
            id: 110, complete: false, priority: 'medium',
            dueDate: '2013-11-15', username: 'Scott',
            title: 'Rename everything', created: '10/2/2013'
        },
        {
            id: 112, complete: true, priority: 'high',
            dueDate: '2013-11-27', username: 'Lena',
            title: 'Alter all quuxes', created: '10/5/2013'
        }
        // , ...
    ]
}

// // OR USE json-server -f data.json
// const Q = require('q')
// const fetchData = function () {
//     const deffered = Q.defer()
//     setTimeout(() => {
//         deffered.resolve(data)
//     }, 1000)
//     return deffered.promise
// }
const fetchData = () => new Promise((res, rej) => res(data))

const getIncompleteTaskSummaries = (memberName) =>
    fetchData()
        .then(data => {
            return data.tasks
        })
        .then(tasks => {
            const results = []
            for (let i = 0, len = tasks.length; i < len; i++) {
                if (tasks[i].username == memberName) {
                    results.push(tasks[i])
                }
            }
            return results
        })
        .then(tasks => {
            const results = []
            for (let i = 0, len = tasks.length; i < len; i++) {
                if (!tasks[i].complete) {
                    results.push(tasks[i])
                }
            }
            return results
        })
        .then(tasks => {
            return tasks.map(task => {
                return {
                    id: task.id,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    title: task.title
                }
            })
        })
        .then(tasks => {
            tasks.sort((first, second) => {
                let a = first.dueDate,
                    b = second.dueDate
                return a < b ? -1 : a > b ? 1 : 0
            })
            return tasks
        })

getIncompleteTaskSummaries('Lena')
    .then(console.log)
    .catch(console.error)

//
// // uncurried Ramda
// const getIncompleteTaskSummaries4 = (memberName) =>
//     fetchData()
//         .then(data => R.get('tasks', data))
//         .then(tasks =>
//             R.filter(task =>
//                     R.propEq('username', memberName, task)
//                 , tasks))
//         .then(tasks =>
//             R.reject(task =>
//                     R.propEq('complete', true, task)
//                 , tasks))
//         .then(tasks =>
//             R.map(task => R.pick(['id', 'dueDate', 'title', 'priority'], task), tasks))
//         .then(abbreviatedTasks =>
//             R.sortBy(abbrTask =>
//                     R.get('dueDate', abbrTask)
//                 , abbreviatedTasks))
//
// // Ramda curried
// const getIncompleteTaskSummaries2 = (memberName) =>
//     fetchData()
//         .then(R.get('tasks'))
//         .then(R.filter(R.propEq('username', memberName)))
//         .then(R.reject(R.propEq('complete', true)))
//         .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
//         .then(R.sortBy(R.get('dueDate')))
//
// // getIncompleteTaskSummaries('Mike')
// // Object object
//
// getIncompleteTaskSummaries2('Scott').then(print)
// getIncompleteTaskSummaries4('Scott').then(print)
//
// getIncompleteTaskSummaries3 = (memberName) =>
//     fetchData()
//         .then(data =>
//             data.tasks
//                 .filter(t => t.username == memberName && !t.complete)
//                 .map(t => {
//                     let copy = {},
//                         props = ['id', 'dueDate', 'title', 'priority'],
//                         p
//                     while (p = props.pop()) {
//                         copy[p] = t[p]
//                     }
//                     return copy
//                 })
//                 .sort((first, second) => first.dueDate - second.dueDate))
// // getIncompleteTaskSummaries3('Scott').then(print);
//
// // One may solve it using very reusable code: an query optimizer.. like SQL optimizes JOIN orders
// // Picture that:
//
// // var getIncompleteTaskSummaries = R.optimize(
// //    then(R.get('tasks'))
// //        .then(R.filter(R.propEq('username', membername)))
// //        .then(R.reject(R.propEq('complete', true)))
// //        .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
// //        .then(R.sortBy(R.get('dueDate')))
// // );
// // this runs SQL-like optimizer // and then runs full transformation/reduction
// getIncompleteTaskSummaries(fetchData())
//
// // That allows you to separate concerns(SOLID all the way)...
// // what needs to be done is different
// // than what would be the fastest possible execution plan giving CURRENT resources
//
// // Please, note that given different data locality(ex: some data in remote servers) the execution order may be different
