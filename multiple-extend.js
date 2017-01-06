function extend() {
    return [].reduce.call(arguments, Object.create, this)
}

const person = {
    sayName() {
        console.log('Hello, my name is ' + this.name)
        return this
    },
    name: 'John Doe',
    extend
}

const ninja = {
    hide: {
        value() {
            this.hidden = true
            return this
        }
    }
}

const wizard = {
    fireball: {
        value() {
            console.log('Pew Pew!')
            return this
        }
    }
}

const ninjaWizard = person.extend(ninja, wizard, {
    name: {
        value: 'Ninja Wizard'
    },
    wtf: {
        value() {
            console.log('RWAWRRRGGGGG!')
            return this
        }
    }
})

ninjaWizard.sayName().wtf().fireball().hide()

const shaggar = ninjaWizard.extend({
    name: {
        value: 'Shaggar, Son of Dolff'
    },
    feedToGoats: {
        value() {
            if (this.hasCutoffManhood) {
                // Do things
            }
        }
    }
})
shaggar.sayName().feedToGoats()
