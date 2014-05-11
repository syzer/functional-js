/**
 * Created by syzer on 14/2/23.
 */

function Animal(name) {
    var speed = 100;                    // private prop
    function openWings() { /* ... */ } // private method

    return {
        run: function() {           //  public function
            console.log(name + " is running!");
        }
    }
}


function Rabbit(name) {
    var rabbit = Animal(name);      //take parent object
    var parentRun = rabbit.run;

    rabbit.jump = function () {         //mutate
        console.log(name + " jumped!");
    };

    rabbit.run = function () {
        parentRun.call(this);
        console.log("fast");
    };

    return rabbit;                  //return child
}

var rabbit = Rabbit("rabbit");
console.log(rabbit.jump());


// with NEW - witch is wrong way to do this
function newRabbit(name) {
    Animal.apply(this, arguments)
    var parentRun = this.run;               // fucked up :(

    this.jump = function() {
        console.log(name + " jumped!")
    }

    this.run = function() {
        parentRun.call(this);
        console.log("fast");
    }
}

var newRabbit = new newRabbit("rab");
//console.log(newRabbit.run());
