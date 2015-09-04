// maybe result

// this need try catch
function query(selector) {
    return document.querySelectorAll(selector);
}

var attemptWith = _.curry(_.attempt, 2);

// stop throwing errors
var elements = attemptWith(query);

// maybe result
function emptyOnError(fn) {
    return function(/*args*/) {
        if (_.isError(fn(arguments[0]))) {
            return [];
        }
        return fn(arguments[0]);
    }
}

var elWithoutErr = emptyOnError(elements);

elWithoutErr('li');
