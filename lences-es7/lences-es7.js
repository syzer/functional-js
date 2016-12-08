// https://medium.com/@drboolean/lenses-with-immutable-js-9bda85674780#.z4jliq5rv
const R = require('ramda')
const Task = require('data.task')
const Maybe = require('data.maybe')
const { mapped, over, view, set, lens, iso, from }  = require('ramda-lens')
const { Map, List } = require('immutable')
const { lensProp, lensIndex, compose, map, toUpper, reverse, replace } = require('ramda')
const Immutable = require('immutable')

// some data
const addrs = [
    { street: '99 Walnut Dr.', zip: '04821' },
    { street: '2321 Crane Way', zip: '08082' }
]
const user = { id: 3, name: 'Charles Bronson', addresses: addrs }

const name = lensProp('name')
const addresses = lensProp('addresses')
const street = lensProp('street')
const allStreets = compose(addresses, mapped, street)
const first = lensIndex(0)

//  :: Int -> Task Error User
const getUser = id => new Task((rej, res) => setTimeout(() => res(user), 400))

// profilePage :: User -> Html
const profilePage = compose(map(x => `<span> ${x.street} <span>`), view(addresses))

// updateUser :: User -> User
const updateUser = over(allStreets, replace(/\d+/, '****'))

// renderProfile :: User -> Html
const renderProfile = compose(map(compose(profilePage, updateUser)), getUser)

renderProfile(1).fork(console.log, console.log)
// [ '<span>**** Walnut Dr.<span>', '<span>**** Crane Way<span>' ]

view(name, user)
// Charles Bronson

set(name, 'Richard Branson', user)
// { id: 3, name: 'Richard Branson', addresses: [ { street: '99 Walnut Dr.', zip: '04821' }, { street: '2321 Crane Way', zip: '08082' } ] }

over(name, toUpper, user)

const firstStreet = compose(addresses, first, street)

over(firstStreet, reverse, user)
// { id: 3, name: 'Charles Bronson', addresses: [ { street: '.rD tunlaW 99', zip: '04821' }, { street: '2321 Crane Way', zip: '08082' } ] }

// mapped x3 is because 3 functors deep:  Task, Maybe, []
over(compose(mapped, mapped, mapped, name), toUpper, Task.of(Maybe.of([user])))
// Task(Maybe([{ id: 3, name: 'CHARLES BRONSON', addresses: [Object] }]))

const immLens = key => lens((x) => x.get(key), (val, x) => x.set(key, val))

// array -> Iso
const arrayIso = iso(x => x.toJS(), x => List.of.apply(List, x))

const jsIso = iso(x => x.toJS(), Immutable.fromJS)

// spliceAndReturn :: [a] -> [a]
const spliceAndReturn = xs => {
    xs.splice(0, 1)
    return xs
}

over(arrayIso, spliceAndReturn, List.of(1, 2, 3, 4, 5))
// List [2,3,4,5]
//
over(from(arrayIso), x => x.take(1), [1, 2, 3, 4, 5])
// [1]

over(jsIso, spliceAndReturn, List.of(1, 2, 3, 4, 5))
// List [ 2, 3, 4, 5 ]
