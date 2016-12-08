const R = require('ramda')
const { path, prop } = R
const _ = require('lodash')
const { Maybe } = require('ramda-fantasy')
// const { Left, Right } = Either

let user = {
    name: 'joe',
    email: 'joe@example.com',
    prefs: {
        languages: {
            primary: 'sp',
            secondary: 'en'
        }
    }
}

// Global indexURLs map for different languages
let indexURLs = {
    'en': 'http://mysite.com/en',  // English
    'sp': 'http://mysite.com/sp', // Spanish
    'jp': 'http://mysite.com/jp'   // Japanese
}

// Simple, but error prone and impure (accesses global variable)
// Imperative
// const getUrl = (language) => allUrls[language]


//Functional Programming

// Before currying:
// const getUrl = (allUrls, language) => {
//     return Maybe(allUrls[language]);
// }

// After currying:
// curry to convert this to a single arg func
const getUrl = R.curry((allUrls, language) =>
    Maybe(allUrls[language])
)

// Store global value in the 'curried' function.
// :: -> Fn (String)
const maybeGetUrl = getUrl(indexURLs)

// wrap user in a Maybe object
// use Ramda's to grab primary language
const getURLForUser = user =>
    Maybe(user)
        .map(path(['prefs', 'languages', 'primary']))

// From this point, maybeGetUrl needs only one argument(language). So we can now chain this like:
// pass language to maybeGetUrl &  get url or null Monad
Maybe(user).chain(getURLForUser).chain(maybeGetUrl)
// Just { value: 'http://mysite.com/sp' }
