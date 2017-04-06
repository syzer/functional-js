// 06.04.2017

// sit friends on the table ... how many ways
// const friends = ['A', 'B', 'C', 'D', 'E']
const friends = ['A', 'B', 'C']//, 'D', 'E']

const permute = (nums) => {
    let res = []

    if (nums.length === 1) {
        return [nums]
    }

    nums.forEach((val, index) => {
        const newNums = nums.slice(0) // copy
        newNums.splice(index, 1)

        const sorts = permute(newNums).map(item => [val].concat(item))
        res = res.concat(sorts)
    })

    return res
}

permute(friends)
