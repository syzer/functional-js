/**
 * Created by syzer on 8/27/2014.
 */

// now
var array = [
    {food: 'mice', race: 'cat'},
    {food: null, race: 'mice'}
];

var getFood = function (anml) {
    return anml.race + 'loves to eat ' + anml.food;
};

_.(array)
    .map(function (anml) {
    if (anml.food && anml.race) {
        return getFood(anml)
    }
});
//or
_.(array)
    .filter(function (el) {
    return el.food && el.race ? true : false;
})
    .map(getFood);

// with maybe
var safeGet = function (anml) {
    return _.maybe(anml.race) + 'loves to eat ' + _.maybe(anml.food);
};

_.(array).map(safeGet);

