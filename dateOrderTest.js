const arr = [
    {id: 104,
        dueDate: '2013-11-29',
        title: 'Do something',
        priority: 'high'},
    {id: 110,
        dueDate: '2013-11-15',
        title: 'Rename everything',
        priority: 'medium'}
]

const arrSorted = arr.sort((first, second) => {
    const test = new Date(first.dueDate) - new Date(second.dueDate)
    return test ? test < 0 ? -1 : 1 : 0
})

const arrSorted2 = arr.sort((first, second) => {
    let a = first.dueDate,
        b = second.dueDate
    return a < b ? -1 : a > b ? 1 : 0
})

console.log(arrSorted)
console.log(arrSorted2)
