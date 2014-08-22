/**
 * Created by syzer on 8/22/2014.
 */
var _ = require('lodash');
function decode(input) {
    return _.map(input.split('\n'), function (line, i) {
        var data = line.split(';');
        console.log(data, data[1].split(' '));
        //TODO make objects
        // sort by value of hint
        // pluck jut words
        // get range, check inresection, last number is missing in intersection
        // add him to end of hints
        var words = data[0].split(' ');
        var hints = data[1].split(' ');
        console.log(_.sortBy(words, function(el, j){
            console.log(el,j, hints[j]);
            return hints[j];
        }));
//        hints.map(function(hint, i){
//            return {w:words[i], h:hint}
//        });

//        console.log(hints);

//        var
//        var hints =
//        return _.map(line, function (char, j) {
//            if( isLetter(char)) {
//                i += 1;
//            }
//            if (i % 2) {
//                return char.toUpperCase();
//            }
//            return char.toLowerCase();
//        }).join('');
    }).join('\n');
}

module.exports.decode = decode;
