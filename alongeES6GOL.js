function delegateToOwn(receiver, propertyName, ...methods) {
    methods.forEach(methodName => {
        receiver[methodName] = function () {
            const metaobject = receiver[propertyName]
            return metaobject[methodName].apply(receiver, arguments)
        }
    })

    return receiver
}

// state machine pattern!!

const Universe = {
    // ...
    numberOfNeighbours(location) {
        // ...
    }
}

const thisGame = Object.assign({}, Universe)

const Alive = {
    alive() {
        return true
    },
    aliveInNextGeneration() {
        return (this.numberOfNeighbours() === 3)
    }
}

const Dead = {
    alive() {
        return false
    },
    aliveInNextGeneration() {
        return (this.numberOfNeighbours() === 2 || this.numberOfNeighbours() === 3)
    }
}

const FsmCell = {
    numberOfNeighbours() {
        return thisGame.numberOfNeighbours(this._location)
    }
}

// delegateToOwn(Cell, '_state', ['alive', 'aliveInNextGeneration']);

const someFsmCell = Object.assign({
    _state: Alive,
    _location: {x: -15, y: 12}
}, FsmCell)

