const R = require('ramda')
const Task = require('data.task')
const Maybe = require('data.maybe')
const { mapped, over, view, set, lens, iso, from }  = require('ramda-lens')
const { Map, List } = require('immutable')
const { lensProp, lensIndex, compose, map, toUpper, reverse, replace } = require('ramda')

// some data
const addrs = [{ street: '99 Walnut Dr.', zip: '04821' }, { street: '2321 Crane Way', zip: '08082' }]
const user = { id: 3, name: 'Charles Bronson', addresses: addrs }

const addresses = R.lensProp('addresses')
const street = lensProp('street')
const allStreets = compose(addresses, mapped, street)

console.log(Task)

//  :: Int -> Task Error User
const getUser = id => new Task((rej, res) => setTimeout(() => res(user), 400))

// profilePage :: User -> Html
const profilePage = compose(map(x => `<span>${x.street}<span>`), view(addresses))

// updateUser :: User -> User
const updateUser = over(allStreets, replace(/\d+/, '****'))

// renderProfile :: User -> Html
const renderProfile = compose(map(compose(profilePage, updateUser)), getUser)

renderProfile(1).fork(console.log, console.log)
// [ '<span>**** Walnut Dr.<span>', '<span>**** Crane Way<span>' ]


// https://medium.com/@drboolean/lenses-with-immutable-js-9bda85674780#.z4jliq5rv
