// 42% faster!!!
_ = require('lodash');
var data = _.map(_.range(10000), function (el) {
    var obj = {};
    obj[el] = 'wat';
    obj[111] = 'man';
    obj[666] = '!';
    obj.name = 'test';
    return obj;
});

var data2 = _.cloneDeep(data);

function isNumeric(num) {
    return !_.isNaN(parseInt(num));
}


console.time('map');
data2 = data2.map(function (article, i) {
    return _.omit(article, function (value, key) {
        return isNumeric(key);
    });
});
console.timeEnd('map');

console.time('forEach');
data.forEach(function (article, i) {
    data[i] = _.omit(article, function (value, key) {
        return isNumeric(key);
    });
});
console.timeEnd('forEach');
console.log(data[0]);

//////////////////////////////////////////////
function filterActiveBad(words) {
    var filtered = [];
    words.forEach(function (word) {
        if (!word.completed) {
            filtered.push(word.name);
        }
    });
    return filtered;
}

function filteredActive(words) {
    return words
        .filter(function (word) {
            return !word.completed;
        })
        .map(function (word) {
            return word.name;
        })
}
