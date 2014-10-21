/**
 * Created by syzer on 8/27/2014.
 */
var _ = require('lodash');
var expect = require('chai').expect;

// implementation by Brandon Weaver
var maybe = function (object, methodCalls) {
    if (_.isUndefined(object)) {
        return undefined;
    }
    if (_.isEmpty(methodCalls)) {
        return object;
    }

    return _.reduce(methodCalls.split('.'), function (obj, method) {
        return obj ? obj[method] : undefined;
    }, object);
};

_.mixin({maybe:maybe});

describe('maybe', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    // now
    var foodChain = [
        {food: 'mice', race: 'cat'},
        {food: null, race: 'mice'}
    ];

    var getFood = function (anml) {
        return anml.race + ' loves to eat ' + anml.food;
    };

    // with maybe
    var safeGet = function (anml) {
        return _.maybe(anml.race) + ' loves to eat ' + _.maybe(anml.food);
    };

    var betterSafeGet = _.maybe(getFood);

    it ('allows safe filters', function (done){
        // old way to do it
        var safeFilter = _(foodChain)
            .filter(function (el) {
                return el.food && el.race ? true : false;
            })
            .map(getFood);
        var mapWithBetterSafeGet = _(foodChain).map(betterSafeGet);
        var filterSafeGet = _(foodChain).filter(betterSafeGet);

        //ERROR
        expect(filterSafeGet.value()).eql(safeFilter.value());

        done();
    });

    it('gets same output as getter with if', function (done){
        var mapWithIf= _(foodChain)
            .map(function (anml) {
                if (anml.food && anml.race) {
                    return getFood(anml)
                }
            });

        var mapWithBetterSafeGet = _(foodChain).map(betterSafeGet);

        //ERROR
        expect(mapWithIf.value()).eql(mapWithBetterSafeGet.value());

        done();
    });

    it('allows safe getters getter', function (done) {
        var outSafeGet = _(foodChain).filter(safeGet);
        var filterWithBetterSafeGet = _(foodChain).filter(betterSafeGet);
        expect(outSafeGet.value()).eql(filterWithBetterSafeGet.value());

        done();
    });

    //describe dot notation
    it('is idempotent', function (done) {
        var object = {a: {b: {c: 1}}};
        expect(_.maybe(object, 'a.b.c')).eql(1); // returns 1
        expect(_.maybe(object, 'a.b.c.d.e.f.g')).to.be.undefined;
        // 1*1 ?= 1
        var one = _.maybe(_.maybe(object, 'a.b.c'), 'a.b.c');

        // ERROR returns undefined
        expect(one).eql(1);

        done();
    })
});







