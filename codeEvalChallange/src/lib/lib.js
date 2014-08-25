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


// [ ['AB'], ['SFB'], ['ADEE'] ]
// +isLetterInArrays :: array, array -> boolean
function isLetterInArrays(letter, array) {
    return _.some(array, function (line) {
        return _.some(line, function (string) {
            return string.indexOf(letter) !== -1;
        });
    })
}

// [x,y] , [x,y]
function mapDistance(el, el2) {
    return (Math.abs(el[0] - el2[0]))
        + Math.abs(el[1] - el2[1]);
}

var memorizedCartesianDistance = _.memoize(cartesianDistance, function (el, el2) {
    return [el, el2];
});

// [x,y] -> number
function cartesianDistance(el, el2) {
    return Math.pow((el2[0] - el[0]), 2) + Math.pow((el2[1] - el[1]), 2);
}

function createArrayWithZerros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : createArrayWithZerros(dimensions.slice(1)));
    }

    return array;
}


function findAttached(node, array) {
    return _.filter(array, function (el, i) {
        if (cartesianDistance(node, el) === 1) {
            return true;
        }
    });
}
