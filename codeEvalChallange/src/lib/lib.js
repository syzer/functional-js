/**
 * Created by syzer on 8/23/2014.
 */
function toNumbers (array) {
    return _(array).map(function (el) {
        return _.parseInt(el);
    }).value();
}

// + toNumber:: string -> integer
function toNumber(num) {
    return _.parseInt(num);
}

function isLetter(char) {
    var letter = char.charAt(0).toUpperCase();
    return letter.toLowerCase() !== letter;
}

function isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
