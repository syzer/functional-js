/**
 * Created by syzer on 5/10/2015.
 */
//te->tea,ted,ten

function count(str) {
    "use strict";
    // compute substring on end
    var maxCount = 0, maxWordStart, maxWordEnd, lastSpace = 0;

    var root = {val: 0};
    var curr = root;


    for (var i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        if (ch === 32) { // space
            // inceares the node counter
            var count = curr.val = curr.val + 1;
            if (count > maxCount) {
                maxCount = count;
                maxWordStart = lastSpace;
                maxWordEnd = i;
            }
            curr = root; // restart from top
            lastSpace = i;
        } else {
            // advance in triee
            var next = curr[ch];
            if (!next) {//undefined
                next = curr[ch] = {val: 0};
            }
            curr = next;
        }
    }
    return str.substring(maxWordStart + 1, maxWordEnd);
}

// not working well
console.log(count('ala ma kota ala'));
