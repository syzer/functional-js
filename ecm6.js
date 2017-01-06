const Promise = require('bluebird');
// import * as Promise from 'bluebird';

(function loop(sum, stop) {
    if (sum < stop) {
        return Promise.delay(250).then(() => {
            sum++
            console.log(sum)
            return loop(sum, stop)
        })
    }
})(0, 10).then(() => console.log('Done'))

// angular
// A model can be a simple vanilla object
const todoModel = {
    label: 'Default',
    completed: false
}

function observer(changes) {
    changes.forEach((change, i) => {
        console.log('what property changed? ' + change.name)
        console.log('how did it change? ' + change.type)
        console.log('whats the current value? ' + change.object[change.name])
        console.log(change) // all changes
    })
}

Object.observe(todoModel, observer)
todoModel.label = 'Buy some more milk'

