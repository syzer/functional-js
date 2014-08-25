/**
 * Created by syzer on 8/23/2014.
 */
module.exports = function (_) {
    function toNumbers(array) {
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

// 'E', [ ['AB'], ['SFB'], ['ADEE'] ] -> true
// +isLetterInArrays :: char, array:array:string -> boolean
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

// makes empty array
// + createArrayWithZeros :: array:integer,integer -> array
    function createArrayWithZeros(dimensions) {
        var array = [];

        for (var i = 0; i < dimensions[0]; ++i) {
            array.push(dimensions.length == 1 ? 0 : createArrayWithZeros(dimensions.slice(1)));
        }

        return array;
    }

    //TODO description and test
    function findAttachedNodes(node, array) {
        return _.filter(array, function (el, i) {
            if (cartesianDistance(node, el) === 1) {
                return true;
            }
        });
    }

    // removes from first array, elements of 2nd array
    // + rejectArrays:: array, array -> array
    function rejectArrays(array, rejectArray) {
        return array.filter(function (el) {
            return !_.some(rejectArray, el);
        });
    }

    // pushes existing and non empty element
    // +pushIfNonEmpty :: array, array -> array
    function pushIfNonEmpty(array, el) {
        if (el && !_.isEmpty(el)) {
            array.push(el);
        }
        return array;
    }


    // TODO just example temp vs reduce
    // -> array [[x,y], [x,y]] -> array [[3, 0], [2,3]]
    function whereLetterInArrayExample(letter, array) {
        var found = [];
        _.map(array, function (line, j) {
            _.forEach(line, function (string, i) {
                _(string).forEach(function (char, i) {
                    if (char === letter) {
                        found.push([i, j]);
                    }
                });
            });
        });
        return found;
    }

    var mWhereLetterInArrays = _.memoize(whereLetterInArraysReduce);

    // +whereLetterInArrayReduce:: char, array:strings, -> array:integer,integer
    function whereLetterInArrayReduce(letter, line, lineNo) {
        return _(line[0]).reduce(function (lineResult, char, i) {
            if (char === letter) {
                lineResult.push([i, lineNo]);
            }
            return lineResult;
        }, []);
    }


    // gives cartesian representation of existence of letter
    // +whereLetterInArraysReduce:: string ('C'), array (['ABC'], ['FGC]) -> array [[0,2], [1,2]]
    function whereLetterInArraysReduce(letter, array) {
        return _(array)
            .chain()
            .reduce(function (arrayResult, line, lineNo) {
                pushIfNonEmpty(
                    arrayResult,
                    whereLetterInArrayReduce(letter, line, lineNo)
                );
                return arrayResult;
            }, [])
            .flatten(true)      // shallow flatten because is wrapped in extra []
            .value()
    }

    return {
        //array
        pushIfNonEmpty: pushIfNonEmpty,
        rejectArrays: rejectArrays,
        toNumber: toNumber,
        toNumbers: toNumbers,

        // validators
        isLetter: isLetter,
        isValidEmail: isValidEmail,
        isLetterInArrays: isLetterInArrays,

        // distances
        mapDistance: mapDistance,
        mCartesianDistance: memorizedCartesianDistance,
        cartesianDistance: cartesianDistance,

        //factory
        createArrayWithZeros: createArrayWithZeros,
        findAttachedNodes: findAttachedNodes,

        //searches
        whereLetterInArrayExample: whereLetterInArrayExample,
        whereLetterInArrays: whereLetterInArraysReduce,
        mWhereLetterInArrays: mWhereLetterInArrays,
        whereLetterInArray: whereLetterInArrayReduce
    };


};


