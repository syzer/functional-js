// http://randycoulman.com/blog/2016/07/12/thinking-in-ramda-lenses/

const { lensProp, assocPath, prop, assoc, path, lensIndex, compose, map, toUpper, reverse, replace } = require('ramda')
const { mapped, over, view, set, lens, iso, from }  = require('ramda-lens')

const person = {
    name: 'Randy',
    socialMedia: {
        github: 'randycoulman',
        twitter: '@randycoulman'
    }
}

// lens => setter, getter
const nameLens = lens(prop('name'), assoc('name'))
const twitterLens = lens(
    path(['socialMedia', 'twitter']),
    assocPath(['socialMedia', 'twitter'])
)

// `view` reads the value of the lens.
// `set` updates the value of the lens.
// `over` applies a transformation function to the lens.
view(nameLens, person)
// => 'Randy'

set(twitterLens, '@randy', person)
// => {
//   name: 'Randy',
//   socialMedia: {
//     github: 'randycoulman',
//     twitter: '@randy'
//   }
// }

// can work with
over(nameLens, toUpper, person)
// => {
//   name: 'RANDY',
//   socialMedia: {
//     github: 'randycoulman',
//     twitter: '@randycoulman'
//   }
// }
