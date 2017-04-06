// 06.04.2017

// sit friends on the table ... how many ways
// 40k+ permutations
const people = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
// to long
// const people = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

const friends = {
    A: ['B', 'C'],
    B: [],
    C: ['D', 'E'],
    G: ['A', 'C', 'D', 'E'],
    H: ['A', 'B', 'D','E', 'F'],
}

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

const permutations = permute(people)

const nearbyFriends = currSitting => (score, person, j) => {
    if (!friends[person]) {
        return score
    }
    if (currSitting[j - 1] && friends[person].includes(currSitting[j - 1])) {
        score++
    }
    if (currSitting[j + 1] && friends[person].includes(currSitting[j + 1])) {
        score++
    }
    return score
}

permutations.reduce((acc, currSitting, i, arr) => {
    const score = currSitting.reduce(nearbyFriends(currSitting), 0)
    if (acc.score < score) {
        acc.score = score
        // reset
        acc.bestSitting = [].concat([currSitting])
    }
    if (acc.score === score) {
        acc.score = score
        acc.bestSitting = acc.bestSitting.concat([currSitting])
    }
    return acc
}, {
    score: 0,
    bestSitting: []
})

// permutations