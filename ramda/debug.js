let R = require('ramda')

// debug
const look = require('ramda-debug')
R = look.wrap(R)
const getTypes = fruits => {
    const getType = R.prop('type')
    const mapTypes = R.map(getType)

    return mapTypes(fruits)
}

const getTypesDebug = look.fov(getTypes);

getTypesDebug([ { 'type': 'fruit' } ])