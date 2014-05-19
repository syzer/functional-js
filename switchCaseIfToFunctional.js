/**
 * Created by syzer on 5/19/2014.
 */
    var _ = require('underscore');

var doSomethingSwitch = function(doWhat) {
    switch(doWhat) {
        case "eat":
            console.log("Eating");
            break;
        case "sleep":
            console.log("Sleeping");
            break;
        case "study":
            console.log("Studding");
            break;
        // additional cases here, etc.
        default:
            // default behavior
            console.log("Trolling");
            break;
    }
};

// might be transformed to

var thingsWeCanDo = {
    eat              : function() { console.log("Eating"); },
    doThatThing      : function() { /* behavior */ },
    doThisOtherThing : function() { /* behavior */ },
    default          : function() { console.log('Trolling') }
};

var doSomething = function(doWhat) {
    var thingToDo = thingsWeCanDo.hasOwnProperty(doWhat) ? doWhat : "default";
    thingsWeCanDo[thingToDo]();
};
doSomething('eat'); // eating

////////////////////////////////////////////

function performCommandHardcoded(command) {
    var result;
    switch (command.type) {
        case 'notify':
            result = notify(command.message);
            break;
        case 'join':
            result = notify("changeView:" ,command.target);
            break;
        default:
            notify('alerting ' + command.type);
    }
    return result;
}

performCommandHardcoded({type: 'notify', message: 'hi!'});
performCommandHardcoded({type: 'join', target: 'waiting-room'});
performCommandHardcoded({type: 'wat'});


function isa(type, action) {
    return function (obj) {
        if (type === obj.type)
            return action(obj);     // returns undefined on unmatched
    }
}
var performCommand = dispatch(
    isa('notify', function (obj) {
        return notify(obj.message)
    }),
    isa('join', function (obj) {
        return changeView(obj.target)
    }),
    function (obj) {                // guard
        notify('Alerting ' + obj.type)
    }
);

var performAdminCommand = dispatch(
    isa('kill', function (obj) {
        return shutdown(obj.hostname)
    }),
    performCommand
);
performAdminCommand({type: 'kill', hostname: 'localhost'});
performAdminCommand({type: 'join', target: 'foo'}); // do same as normal user

var performTrialUserCommand = dispatch(
    isa('join', function (obj) {
        print("Alert Cannot join until approved!!")
    }),
    performCommand
);
print('----trial user----');
performTrialUserCommand({type: 'join', target: 'foo'}); //
performTrialUserCommand({type: 'notify', message: 'Hi new user'});  // like normal user

