/**
 * Created by syzer on 5/26/2014.
 */
var bilby = require('bilby');

function voice(type, sound) {
    return ["The", type, "says", sound].join(' ');
}
function isA(thing) {
    return function(obj) {
        return obj.type == thing;
    }
}
function say(sound) {
    return function(obj) {
        console.log(voice(obj.type, sound));
    }
}

var animals = bilby.environment();
var animals = animals.method('speak', isA('cat'), say("mew"));
animals.speak({type: 'cat'});   // The cat says mew

try {
    animals.speak({type: 'dog'});   // method not implemented
} catch (e) {
   console.log(e);
}

var animals = animals.method('speak', isA('dog'), say("woof"));
animals.speak({type: 'dog'});   // method not implemented

var animals = animals.method('speak',
    function(obj) {
        return (isA('frog')(obj) && (obj.status == 'dead'))
    },
    say('Hello ma, baby!')
);
animals.speak({type: 'frog', status: 'dead'});  // the frog says hello ma baby
