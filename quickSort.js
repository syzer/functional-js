const { List } = require('immutable')

const quickSort = (list) => {
    if (list.isEmpty()) {
        return list
    }

    let pivot = list.first()
    let remaining = list.rest()

    let lessThanPivot = remaining.filter(v => v < pivot)
    let biggerThanPivot = remaining.filter(v => v >= pivot)

    return quickSort(lessThanPivot)
        .concat(pivot)
        .concat(quickSort(biggerThanPivot))
}

quickSort(List([1, 23, 42, 9, 5, 2, 8]))
// List [ 1, 2, 5, 8, 9, 23, 42 ]
