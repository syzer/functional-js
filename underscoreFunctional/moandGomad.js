/**
 * http://www.youtube.com/watch?v=dkZFtimgAcM
 */
//idendity monad
 
//ajax monad
 //monad macroid
//create monad, will put bind method
//takes function as parameter
function MONAD() {
    return function unit(value) {
        var monad = Object.create(null);
        monad.bind = function (func) {
            return func(value);        
        };
        return monad;
    };
}

function MonadWithProtototype() {
	var prototype = Object.create(null);
	function unit(value) {
        var monad = Object.create(prototype);
        monad.bind = function (func, args) {
            //return func(value);  
            return (func(value, args));	//may come
        };    
        if (typeof modifier === 'function') {
            modifier (moand, value);
        }
        return monad;
    };
    unit.lift = function (name, func) {
        prototype[name] = function (name,args) {
                return unit(this.bind(func, args));
        };
    return unit;
    }
}
    

var ajax = MonadWithProtototype().lift('alert', alert);
var monad = ajax("Hello world.");
monad.alert();

//avoiding Null Pointer Exception!!!
//Maybe monad //NaN to avoid division by 0
var monad = maybe(null);
monad.bind(alert);	//will not throw exception!!!!!


/**
 * threads are evil -> moving to functional help,
 * because u could distribute, all computation will be
 * not mutable
 * 
 * turn based processing - is another take, event drivent systems
 * law of turns - never wait, never block, finish fast;
 * most UI framewroks works like that:
 * twisted, nodejs
 * web browsers works this way
 *  - async can be hard to menage
 * 
 * 
 * or Promises -> posib le future value. 
 * future from actor model
 * 3 states: kept, broken, pending
 * register with when(success, failure)
 * when returns functions so u may compose them
 */

var my_vow = VOW.make();
my_vow.keep(value)
.break(reason)
.promise
.when(kept, broken);

//access file system using promise!!!! non blocking IO
//failure function vs exception
//exception handler unwires the stack
//turn based system stack goes back to 0
//so u cannot go back in time, but broken promises can be delikvered across turns

//cascading promises
mypromise.when(succes_a).when(success_b);
//promises are monads, but:
//* (but the value is not know when promise is made)
//* each promise is liked to resolver => keep/break


var VOW = (function() {
	//function enquenque here
    var breakers = [], fate, keepers = [], status = 'pending';
    
    function herald(state, value, queue) {
        if (status !== 'pending') {
            throw "overpromise"; //cannot relove it more then once
        }
        fate = value;
        status = state;
        enlighten(queue, fate);
        keepers.lenght = 0;	//empty 2 ques
        breakers.length = 0;
    };
    function enqueue() { //put stuf on que and return to promise
    	
    }; 
    function enlighten(queue, fate) {
        queue.forEach(function (func) {
        	setImmediate(func, fate);
        });
    };
    return {
        break: function (reason) {	
            herald('broken', value, breakers);
        },
        keep: function (value) {
            herald('kept', value, keepers);
        },
        promise: {	//promise object
            is_promise : true,
            when : function(kept, broken) {
        	    var vow = make();
        	    switch (status) {
        	    case 'pending':
        	    	enqueue(keepers, kept, vow.keep, vow.break);
        	    	enqueue(keepers, broken, vow.break, vow.break);
        	    	break;
        	    case 'kept':
        	    	enqueue(keepers, kept, vow.keep, vow.break);
        	    	enlighten(keepers, fate);
        	    	break;
        	    case 'broken':
        	    	enqueue(breakers, broken, vow.break);
        	    	enlighten(breakers, fate);
        	    	break;
        	    }
        	    return vow.promise;
            }
        }
    }
    //function 
    //.... 40 min signing offs
})(); //the dog balls

/**
 *
 *
 */




















