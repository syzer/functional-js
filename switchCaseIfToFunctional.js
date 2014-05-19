/**
 * Created by syzer on 5/19/2014.
 */
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


