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

    // + toBitwise :: string -> string(bitwise)
    function toBitwise(string) {
        return _.parseInt(string).toString(2);
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

    var memoizedLcs = _.memoize(lcs, function (a, b) {
        return a + ';' + b;
    });

    function lcSubstring(x, y) {
        var s, i, j, m, n,
            lcs = [], row = [], c = [],
            left, diag, latch;
        //make sure shorter string is the column string
        if (m < n) {
            s = x;
            x = y;
            y = s;
        }
        m = x.length;
        n = y.length;
        //build the c-table
        for (j = 0; j < n; row[j++] = 0);
        for (i = 0; i < m; i++) {
            c[i] = row = row.slice();
            for (diag = 0, j = 0; j < n; j++, diag = latch) {
                latch = row[j];
                if (x[i] == y[j]) {
                    row[j] = diag + 1;
                }
                else {
                    left = row[j - 1] || 0;
                    if (left > row[j]) {
                        row[j] = left;
                    }
                }
            }
        }
        i--, j--;

        var t = i;
        while (i > -1 && j > -1) {
            switch (c[i][j]) {
                default:
                    i--, j--;
                    continue;
                case (i && c[i - 1][j]):
                    if (t !== i) {
                        lcs.unshift(x.substring(i + 1, t + 1));
                    }
                    t = --i;
                    continue;
                case (j && c[i][j - 1]):
                    j--;
                    if (t !== i) {
                        lcs.unshift(x.substring(i + 1, t + 1));
                    }
                    t = i;
            }
        }
        if (t !== i) {
            lcs.unshift(x.substring(i + 1, t + 1));
        }

        return lcs.join('');
    }

    function lcs(a, b) {
        var leftSub = a.substr(0, a.length - 1);
        var rightSub = b.substr(0, b.length - 1);

        if (a.length === 0 || b.length === 0) {
            return '';
        }
        if (a.charAt(a.length - 1) === b.charAt(b.length - 1)) {
            return memoizedLcs(leftSub, rightSub) + a.charAt(a.length - 1);
        } else {
            var left = memoizedLcs(a, rightSub);
            var right = memoizedLcs(leftSub, b);

            // longest shortest
            return (left.length > right.length) ? left : right;
        }
    }

    function lcs_greedy(x, y) {
        var symbols = {},
            r = 0, p = 0, p1, L = 0, idx,
            m = x.length, n = y.length,
            S = new Buffer(m < n ? n : m);
        p1 = popsym(0);
        for (i = 0; i < m; i++) {
            p = (r === p) ? p1 : popsym(i);
            p1 = popsym(i + 1);
            idx = (p > p1) ? (i++, p1) : p;
            if (idx === n) {
                p = popsym(i);
            }
            else {
                r = idx;
                S[L++] = x.charCodeAt(i);
            }
        }
        return S.toString('utf8', 0, L);

        function popsym(index) {
            var s = x[index],
                pos = symbols[s] + 1;
            pos = y.indexOf(s, pos > r ? pos : r);
            if (pos === -1) {
                pos = n;
            }
            symbols[s] = pos;
            return pos;
        }
    }

    //TODO unsafe with space
    // +isUpperCase :: char -> boolean
    function isUpperCase(char) {
        return char === char.toUpperCase()
    }

    //TODO unsafe with empty string
    // +countLowerUpperCase :: string -> array
    function countLowerUpperCase(string) {
        return _(string).reduce(function (sum, char) {
            isUpperCase(char) ? sum[1] += 1 : sum[0] += 1;
            return sum;
        }, [0, 0]);

    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function groupByNrOfEl(array, el) {
        var groupByEl = [];
        var group = [];
        array.forEach(function (num, i) {
            group.push(num);
            if (i % el === el - 1 || i === array.length - 1) {
                groupByEl.push(_.clone(group));
                group = [];
            }
        });
        return groupByEl;
    }

    // [1,2,3] => [[1,2,3], [2,1,3], [3,2,1], [1,3,2] [3,1,2]]
    function permute(input, usedChars, permArr) {
        var i, ch;
        usedChars = usedChars || [];
        permArr = permArr || [];

        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            permute(input, usedChars, permArr);
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr
    }

    return {

        // string
        lcs: lcs,
        mLcs: memoizedLcs,
        toBitwise: toBitwise,
        countLowerUpperCase: countLowerUpperCase,
        // all occurrences, not just first one
        replaceAll: replaceAll,

        // array
        pushIfNonEmpty: pushIfNonEmpty,
        rejectArrays: rejectArrays,
        toNumber: toNumber,
        toNumbers: toNumbers,
        groupByNrOfEl: groupByNrOfEl,
        permute: permute,

        // validators
        isUpperCase: isUpperCase,
        isLetter: isLetter,
        isValidEmail: isValidEmail,
        isLetterInArrays: isLetterInArrays,

        // distances
        mapDistance: mapDistance,
        mCartesianDistance: memorizedCartesianDistance,
        cartesianDistance: cartesianDistance,

        //factory array
        createArrayWithZeros: createArrayWithZeros,
        findAttachedNodes: findAttachedNodes,

        //searches array
        whereLetterInArrayExample: whereLetterInArrayExample,
        whereLetterInArrays: whereLetterInArraysReduce,
        mWhereLetterInArrays: mWhereLetterInArrays,
        whereLetterInArray: whereLetterInArrayReduce
    };


};


