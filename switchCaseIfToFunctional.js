/**
 * Created by syzer on 5/19/2014.
 */
const _ = require('underscore')

const doSomethingSwitch = function (doWhat) {
    switch (doWhat) {
        case 'eat':
            console.log('Eating')
            break
        case 'sleep':
            console.log('Sleeping')
            break
        case 'study':
            console.log('Studding')
            break
        // additional cases here, etc.
        default:
            // default behavior
            console.log('Trolling')
            break
    }
}

// might be transformed to

const thingsWeCanDo = {
    eat() {
        console.log('Eating')
    },
    doThatThing() { /* behavior */ },
    doThisOtherThing() { /* behavior */ },
    default() {
        console.log('Trolling')
    }
}

const doSomething = function (doWhat) {
    const thingToDo = thingsWeCanDo.hasOwnProperty(doWhat) ? doWhat : 'default'
    thingsWeCanDo[thingToDo]()
}
doSomething('eat') // eating

// //////////////////////////////////////////

function performCommandHardcoded(command) {
    let result
    switch (command.type) {
        case 'notify':
            result = notify(command.message)
            break
        case 'join':
            result = notify('changeView:', command.target)
            break
        default:
            notify('alerting ' + command.type)
    }
    return result
}

performCommandHardcoded({type: 'notify', message: 'hi!'})
performCommandHardcoded({type: 'join', target: 'waiting-room'})
performCommandHardcoded({type: 'wat'})

function isa(type, action) {
    return function (obj) {
        if (type === obj.type) {
            return action(obj)
        }     // returns undefined on unmatched
    }
}
const performCommand = dispatch(
    isa('notify', obj => {
        return notify(obj.message)
    }),
    isa('join', obj => {
        return changeView(obj.target)
    }),
    obj => {                // guard
        notify('Alerting ' + obj.type)
    }
)

const performAdminCommand = dispatch(
    isa('kill', obj => {
        return shutdown(obj.hostname)
    }),
    performCommand
)
performAdminCommand({type: 'kill', hostname: 'localhost'})
performAdminCommand({type: 'join', target: 'foo'}) // do same as normal user

const performTrialUserCommand = dispatch(
    isa('join', obj => {
        print('Alert Cannot join until approved!!')
    }),
    performCommand
)
print('----trial user----')
performTrialUserCommand({type: 'join', target: 'foo'}) //
performTrialUserCommand({type: 'notify', message: 'Hi new user'})  // like normal user

