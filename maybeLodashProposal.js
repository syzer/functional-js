/**
 * Created by syzer on 8/27/2014.
 */
const _ = require('lodash')
const expect = require('chai').expect

// implementation by Brandon Weaver
const maybe = function (object, methodCalls) {
    if (_.isUndefined(object)) {
        return undefined
    }
    if (_.isEmpty(methodCalls)) {
        return object
    }

    return _.reduce(methodCalls.split('.'), (obj, method) => {
        return obj ? obj[method] : undefined
    }, object)
}

_.mixin({maybe})

describe('maybe', () => {
    afterEach(done => {
        setTimeout(done, 60)
    })

    // now
    const foodChain = [
        {food: 'mice', race: 'cat'},
        {food: null, race: 'mice'}
    ]

    const getFood = function (anml) {
        return anml.race + ' loves to eat ' + anml.food
    }

    // with maybe
    const safeGet = function (anml) {
        return _.maybe(anml.race) + ' loves to eat ' + _.maybe(anml.food)
    }

    const betterSafeGet = _.maybe(getFood)

    it('allows safe filters', done => {
        // old way to do it
        const safeFilter = _(foodChain)
            .filter(el => {
                return el.food && el.race ? true : false
            })
            .map(getFood)
        const mapWithBetterSafeGet = _(foodChain).map(betterSafeGet)
        const filterSafeGet = _(foodChain).filter(betterSafeGet)

        // ERROR
        expect(filterSafeGet.value()).eql(safeFilter.value())

        done()
    })

    it('gets same output as getter with if', done => {
        const mapWithIf = _(foodChain)
            .map(anml => {
                if (anml.food && anml.race) {
                    return getFood(anml)
                }
            })

        const mapWithBetterSafeGet = _(foodChain).map(betterSafeGet)

        // ERROR
        expect(mapWithIf.value()).eql(mapWithBetterSafeGet.value())

        done()
    })

    it('allows safe getters getter', done => {
        const outSafeGet = _(foodChain).filter(safeGet)
        const filterWithBetterSafeGet = _(foodChain).filter(betterSafeGet)
        expect(outSafeGet.value()).eql(filterWithBetterSafeGet.value())

        done()
    })

    // describe dot notation
    it('is idempotent', done => {
        const object = {a: {b: {c: 1}}}
        expect(_.maybe(object, 'a.b.c')).eql(1) // returns 1
        expect(_.maybe(object, 'a.b.c.d.e.f.g')).to.be.undefined
        // 1*1 ?= 1
        const one = _.maybe(_.maybe(object, 'a.b.c'), 'a.b.c')

        // ERROR returns undefined
        expect(one).eql(1)

        done()
    })
})

