/**
 * Created by syzer on 5/10/2015.
 */
// te->tea,ted,ten

function count(str) {
    'use strict'
    // compute substring on end
    let maxCount = 0,
        maxWordStart, maxWordEnd,
        lastSpace = 0

    const root = {val: 0}
    let curr = root

    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i)
        if (ch === 32) { // space
            // inceares the node counter
            const count = curr.val = curr.val + 1
            if (count > maxCount) {
                maxCount = count
                maxWordStart = lastSpace
                maxWordEnd = i
            }
            curr = root // restart from top
            lastSpace = i
        } else {
            // advance in triee
            let next = curr[ch]
            if (!next) {// undefined
                next = curr[ch] = {val: 0}
            }
            curr = next
        }
    }
    return str.substring(maxWordStart + 1, maxWordEnd)
}

// not working well
console.log(count('ala ma kota ala'))
