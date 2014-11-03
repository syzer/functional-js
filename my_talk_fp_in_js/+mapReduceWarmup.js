/**
 * Created by syzer on 10/30/2014.
 */
var isTheArea = [
    'Urban',
    'Peri-urban',
    'Rural',
    'NS'
];

function addNameProp(el) {
    return {name: el}
}

// add map call to get
var isTheArea2 = [
    { name: 'Urban' },
    { name: 'Peri-urban' },
    { name: 'Rural' },
    { name: 'NS' }
];




console.log(isTheArea);
//.map(addNameProp);

var taskConfig,todos, deferred, dispatcher={addTask:function(){}}, task, i;

_.times(taskConfig.times, function(n) {
    deferred = defer();
    dispatcher.addTask(task, deferred);
    todos.push(deferred.promise);
});

// vs

for (i = 1; i <= taskConfig.times; i++) {
    deferred = defer();
    dispatcher.addTask(task, deferred);
    todos.push(deferred.promise);
}
