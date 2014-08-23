/**
 * Created by syzer on 8/23/2014.
 */
function toNumbers (array) {
    return _(array).map(function (el) {
        return _.parseInt(el);
    }).value();
}

function isLetter(char) {
    var letter = char.charAt(0).toUpperCase();
    return letter.toLowerCase() !== letter;
}
