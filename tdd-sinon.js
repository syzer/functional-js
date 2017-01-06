/**
 * Created by syzer on 14/2/26.
 */
require('mocha-sinon')
const sinon = require('sinon')
const callback = sinon.spy()
callback()
callback.called
callback.callCount
// callback.calledWith(arg1);
callback.threw()
// callback.returned(obj);
// callback.calledBefore(spy);
// callback.calledAfter(spy);

var missionImpossible = {
    start(agent) {
        agent.apply(this)
    }
}

// By using a sinon.spy(), it allows us to track how the function is used
const ethanHunt = sinon.spy()
missionImpossible.start(ethanHunt)
console.log(ethanHunt.called)
console.log(ethanHunt.calledOnce)
console.log(ethanHunt.callCount)

var stub = sinon.stub(),
    opts = {call(msg) {
        console.log(msg)
    }}

// We can control how the sinon.stub() will behave based on how it’s called!
stub.withArgs('Hello').returns('World')
stub.withArgs('Wuz').returns('Zup?')
stub.withArgs('Kapow').throws()
stub.withArgs(opts).yieldsTo('call', ['Howdy'])
console.log(stub('Hello')) // "World"

var missionImpossible = {
    numberOfAssignments: 0,
    assignment(answer, tape) {
        const mission = tape(answer)
        this.numberOfAssignments++
        return mission
    }
}
function Mission() { }
const tape = sinon.stub()
tape.withArgs('accept').returns(new Mission())
tape.withArgs('reject').throws('Disintegrate')
console.log(tape('accept'))
console.log(missionImpossible.assignment('accept', tape))

var opts = {call(msg) {
        console.log(msg)
    }},
    mock = sinon.mock(opts)

// You state your success criteria upfront
mock.expects('call').once().withExactArgs('Hello World')
/* ... twice, atMost, never, exactly, on, etc ... */
opts.call('Hello World')
mock.verify()
mock.restore()

