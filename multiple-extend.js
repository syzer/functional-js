function extend () {
    return [].reduce.call(arguments, Object.create, this);
}

var person = {
    sayName: function () {
        console.log("Hello, my name is " + this.name);
        return this;
    },
    name: "John Doe",
    extend: extend
};

var ninja = {
    hide: {
        value: function () {
            this.hidden = true;
            return this;
        }
    }
};

var wizard = {
    fireball: {
        value: function () {
            console.log("Pew Pew!");
            return this;
        }
    }
};

var ninjaWizard = person.extend(ninja, wizard, {
    name: {
        value: "Ninja Wizard"
    },
    wtf: {
        value: function () {
            console.log("RWAWRRRGGGGG!");
            return this;
        }
    }
});

ninjaWizard.sayName().wtf().fireball().hide();

var shaggar = ninjaWizard.extend({
    name: {
        value: "Shaggar, Son of Dolff"
    },
    feedToGoats: {
        value: function () {
            if (this.hasCutoffManhood) {
                //Do things
            }            
        }
    }
});
shaggar.sayName().feedToGoats();
