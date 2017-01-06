/**
 * Created by syzer on 14/1/27.
 */

/**
 * cutoff non unique keys from array
 * @returns {Array}
 */
Array.prototype.unique = function () {
    const a = this.concat()
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) {
                a.splice(j, 1)
            }
        }
    }
    return a
}

const array1 = new Array(45, 46, 47, 48)
const array2 = new Array(47, 48, 49)
const array3 = array1.concat(array2).unique()
console.log(array3)    // 45,46,47,48,49
