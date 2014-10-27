/**
 * Created by syzer on 10/22/2014.
 */
//http://fr.umio.us/favoring-curry/
// Haskell Curry
var R = require('ramda');
var _ = require('lodash');
var print = console.log;

_.map(['1.1', '2.2', '3.3'], parseFloat);           //=> [1.1, 2.2, 3.3]
var wrong = _.map(['1', '2', '3'], parseInt);       //=> [1, NaN, NaN]
R.map(parseFloat, ['1.1', '2.2', '3.3']);           //=> [1.1, 2.2, 3.3]
var right = R.map(parseInt, ['1', '2', '3']);       //=> [1, 2, 3]
print(wrong, right);

/**
 * PARTIAL APPLICATION
 */

// uncurried version
var formatName1 = function (first, middle, last) {
    return first + ' ' + middle + ' ' + last;
};
var johnPaulJones = formatName1('John', 'Paul', 'Jones');
console.log(johnPaulJones); //=> 'John Paul Jones' // (Ah, but the musician or the admiral?)

var johnPaul = formatName1('John', 'Paul');
console.log(johnPaul); //=> 'John Paul undefined'); !!!! sic

// so better use curried version
var formatNames2 = R.curry(function (first, middle, last) {
    return first + ' ' + middle + ' ' + last;
});

var johnPaul2 = formatNames2('John', 'Paul');
console.log(johnPaul2(''));                                 // John Paul
console.log(johnPaul2('Jones'));                            // John Paul Jones
print(['Jones', 'Stevens', 'Ziller'].map(johnPaul2));      // [ 'John Paul Jones', 'John Paul Stevens', 'John Paul Ziller' ]

// Plain JS:
var add = function (a, b) {
    return a + b;
};
var numbers = [1, 2, 3, 4, 5];
var sum = numbers.reduce(add, 0);
print(sum); // 15

var sum2 = R.reduce(add, 0, numbers);           // REDUCE IS CURRIED
print(sum2);   // 15
// what about reusing to other than numbers?

// total:: [Number] -> Number
var total = R.reduce(add, 0); // returns a function
print(total(numbers));

/////////////////////////////////////////////////////////////////////////////////////////
var data = {
    result: 'SUCCESS',
    interfaceVersion: '1.0.3',
    requested: '10/17/2013 15:31:20',
    lastUpdated: '10/16/2013 10:52:39',
    tasks: [
        {id: 104, complete: false, priority: 'high',
            dueDate: '2013-11-29', username: 'Scott',
            title: 'Do something', created: '9/22/2013'},
        {id: 105, complete: false, priority: 'medium',
            dueDate: '2013-11-22', username: 'Lena',
            title: 'Do something else', created: '9/22/2013'},
        {id: 107, complete: true, priority: 'high',
            dueDate: '2013-11-22', username: 'Mike',
            title: 'Fix the foo', created: '9/22/2013'},
        {id: 108, complete: false, priority: 'low',
            dueDate: '2013-11-15', username: 'Punam',
            title: 'Adjust the bar', created: '9/25/2013'},
        {id: 110, complete: false, priority: 'medium',
            dueDate: '2013-11-15', username: 'Scott',
            title: 'Rename everything', created: '10/2/2013'},
        {id: 112, complete: true, priority: 'high',
            dueDate: '2013-11-27', username: 'Lena',
            title: 'Alter all quuxes', created: '10/5/2013'}
        // , ...
    ]
};

//OR USE json-server -f data.json
var Q = require('q');
var fetchData = function () {
    var deffered = Q.defer();
    setTimeout(function () {
        deffered.resolve(data);
    }, 1000);
    return deffered.promise;
};

var getIncompleteTaskSummaries = function (memberName) {
    return fetchData()
        .then(function (data) {
            return data.tasks;
        })
        .then(function (tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (tasks[i].username == memberName) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function (tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (!tasks[i].complete) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function (tasks) {
            return tasks.map(function (task) {
                return {
                    id: task.id,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    title: task.title
                }
            });
        })
        .then(function (tasks) {
            tasks.sort(function (first, second) {
                var a = first.dueDate, b = second.dueDate;
                return a < b ? -1 : a > b ? 1 : 0;
            });
            return tasks;
        });
};

// uncurried Ramda
var getIncompleteTaskSummaries4 = function(memberName) {
    return fetchData()
        .then(function(data) {
            return R.get('tasks', data)
        })
        .then(function(tasks) {
            return R.filter(function(task) {
                return R.propEq('username', memberName, task)
            }, tasks)
        })
        .then(function(tasks) {
            return R.reject(function(task) {
                return R.propEq('complete', true, task);
            }, tasks)
        })
        .then(function(tasks) {
            return R.map(function(task) {
                return R.pick(['id', 'dueDate', 'title', 'priority'], task);
            }, tasks);
        })
        .then(function(abbreviatedTasks) {
            return R.sortBy(function(abbrTask) {
                return R.get('dueDate', abbrTask);
            }, abbreviatedTasks);
        });
};

// Ramda curried
var getIncompleteTaskSummaries2 = function (memberName) {
    return fetchData()
        .then(R.get('tasks'))
        .then(R.filter(R.propEq('username', memberName)))
        .then(R.reject(R.propEq('complete', true)))
        .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
        .then(R.sortBy(R.get('dueDate')));
};


// getIncompleteTaskSummaries('Mike')
// Object object

getIncompleteTaskSummaries2('Scott').then(print);
getIncompleteTaskSummaries4('Scott').then(print);

getIncompleteTaskSummaries3 = function (memberName) {
    return fetchData().then(function (data) {
        return data.tasks.filter(function (t) {
            return t.username == memberName && !t.complete;
        }).map(function (t) {
            var copy = {}, props = ["id", "dueDate", "title", "priority"], p;
            while (p = props.pop()) {
                copy[p] = t[p]
            }
            return copy;
        }).sort(function (first, second) {
            return first.dueDate - second.dueDate;
        });
    });
};
//getIncompleteTaskSummaries3('Scott').then(print);


//One may solve it using very reusable code: an query optimizer.. like SQL optimizes JOIN orders
//Picture that:

    var getIncompleteTaskSummaries = R.optimize(
        then(R.get('tasks'))
            .then(R.filter(R.propEq('username', membername)))
            .then(R.reject(R.propEq('complete', true)))
            .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
            .then(R.sortBy(R.get('dueDate')))
    );
// this runs SQL-like optimizer // and then runs full transformation/reduction
getIncompleteTaskSummaries(fetchData());


//That allows you to separate concerns(SOLID all the way)...
//what needs to be done is different
//than what would be the fastest possible execution plan giving CURRENT resources

//Please, note that given different data locality(ex: some data in remote servers) the execution order may be different
