/**
 * Created by syzer on 9/2/2014.
 */
var _ = require('lodash');
var lib = require('./../lib/lib')(_);
_.mixin(lib);


//TODO lib
//4; 1:[1, 3, 2], 2:[1], 3:[4, 3], 4:[4, 3] -> [ [ 1, 3, 2 ], [ 1 ], [ 4, 3 ], [ 4, 3 ] ]
function extractArrays(string) {
    var rx1 = /\[([^\]]+)]/g;
    return JSON.parse('[' + string.match(rx1).join(',') + ']');
//    return string.match(rx1).join(',');
}

function makeTree(initialArr, cb, arrays, tree, prev, level) {
    arrays = arrays || _.clone(initialArr);
    tree = tree || [];
    prev = prev || [];
    level = level || 1;

    if (level > initialArr.length) {
//        console.log('\nRETURNING:', tree);
        return cb(tree);
    }
    var el = arrays.shift();
//    console.log('\nel:', el);

    if (!el) {
        return tree;
    }

    el.forEach(function (num) {
        if (num !== prev[0]) {
            var node = [ prev[0], num, 'lev:' + level];
            tree.push(node);
            return makeTree(initialArr, cb, arrays, tree, el, level + 1);
        }
    });


}


// TODO lib
function unflatten(array, parent, tree) {

    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { id: 0 };

    var children = _.filter(array, function (child) {
        return child.parentId == parent.id;
    });

    if (!_.isEmpty(children)) {
        if (parent.id == 0) {
            tree = children;
        } else {
            parent['children'] = children
        }
        _.each(children, function (child) {
            unflatten(array, child)
        });
    }

    return tree;
}

function checkTree(data) {
    var out = _.uniq(data.map(function (el) {
        return el[1];
    })).length;
    console.log(out, data.length);

//    var out = data.reduce()
    return data.length === out;
}

function findPath(arrays, currPath, level, currEl) {
//    currPath = currPath || [];
//    level = level || 1;
//    currEl = currEl || [];
//
//    if (level > arrays.length) {
//        return currPath
//    }

    var tree = makeTree(arrays, function (data) {
        console.log('finished:', data);
        var flag = checkTree(data);
        console.log('\n\n----\n', flag);
    });
    console.log('the tree is', tree);
//    return findRoute(tree);
//    arrays.forEach(function (array, i) {
//        currEl = _.xor(array, currEl);
//        console.log('\ncurrArray:', array, i, currEl, currPath);
//        currPath =
//        return findPath(arrays, _.clone(currPath), level + 1, _.clone(currEl));
//    });

//    console.log('arrays', arrays);
    return false;
}

function seatTeamMembers(line) {
    line = extractArrays(line);
    line = _.sortBy(line, function (numbers) {
        return numbers.length;
    });
    console.log('line', line);
    return findPath(line) ? 'Yes' : 'No';
}

function readLines(input, lineCallback) {
    return input
        .split('\n')
        .map(function (line, i) {
            if ('' === line) {
                return;
            }
            return lineCallback(line, i);
        })
        .join('\n');
}

function run(input) {
    return readLines(input, seatTeamMembers);
}

module.exports.run = run;
module.exports.extractArrays = extractArrays;
module.exports.unflatten = unflatten;
