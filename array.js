/**
 * Created by syzer on 14/1/27.
 */

/**
 * cutoff non unique keys from array
 * @returns {Array}
 */
Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j, 1);
        }
    }
    return a;
};


var array1 = new Array(45, 46, 47, 48);
var array2 = new Array(47, 48, 49);
var array3 = array1.concat(array2).unique();
console.log(array3);    //45,46,47,48,49
