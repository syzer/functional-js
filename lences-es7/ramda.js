const {
    lensProp, assocPath, prop, assoc, path,
    lensIndex, compose, map, toUpper,
    reverse, replace, both, either,
    defaultTo, ifElse, cond, equals, always, T, lt, identity, __
} = require('ramda')

// http://randycoulman.com/blog/2016/06/14/thinking-in-ramda-declarative-programming/
// instead arithmetic operators
const wasBornInCountry = person => equals(person.birthCountry, 'Swiss')
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => gte(person.age, 18)

const isCitizen = either(wasBornInCountry, wasNaturalized)
const isEligibleToVote = both(isOver18, isCitizen)

const settings = { lineWidth: 90 }
const lineWidth = defaultTo(80, settings.lineWidth)
const forever21 = age => ifElse(lt(21), () => 21, inc)(age)

const alwaysDrivingAge = age => ifElse(lt(__, 16), always(16), identity)(age)
alwaysDrivingAge(20)
// 20

// lisp cond
const water = temperature => cond([
    [equals(0),   always('water freezes at 0°C')],
    [equals(100), always('water boils at 100°C')],
    [T,           temp => `nothing special happens at ${temp}°C`]
])(temperature)
water(20)
// nothing special happens at 20°C
