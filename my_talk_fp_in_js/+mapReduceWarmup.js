/**
 * Created by syzer on 10/30/2014.
 */
const isTheArea = [
    'Urban',
    'Peri-urban',
    'Rural',
    'NS'
]

const noop = () => ({})
const addNameProp = el => ({ name: el })

// add map call to get
const isTheArea2 = [
    { name: 'Urban' },
    { name: 'Peri-urban' },
    { name: 'Rural' },
    { name: 'NS' }
]

console.log(isTheArea)
//.map(addNameProp)

let taskConfig,
    todos,
    deferred,
    dispatcher = { addTask: noop },
    task,
    i

_.times(taskConfig.times, n => {
    deferred = defer()
    dispatcher.addTask(task, deferred)
    todos.push(deferred.promise)
})

// vs

for (i = 1; i <= taskConfig.times; i++) {
    deferred = defer()
    dispatcher.addTask(task, deferred)
    todos.push(deferred.promise)
}
