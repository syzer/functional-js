/**
 * Created by syzer on 5/31/2014.
 */
function countWords(inputWords) {

    return inputWords.reduce(function (results, word) {
        //console.log('TOTAL' , total);
        if (results[word] === undefined) {
            results[word] = 1
        } else {
            results[word] += 1;
        }
        return results;
    }, {});     //start with empty

}

module.exports = countWords;
