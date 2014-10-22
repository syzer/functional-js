var arr = [
    { id: 104,
        dueDate: '2013-11-29',
        title: 'Do something',
        priority: 'high' },
    { id: 110,
        dueDate: '2013-11-15',
        title: 'Rename everything',
        priority: 'medium' }
];

var arrSorted = arr.sort(function (first, second) {
    var test = new Date(first.dueDate) - new Date(second.dueDate);
    return test ? test < 0 ? -1 : 1 : 0;
});


var arrSorted2 = arr.sort(function (first, second) {
    var a = first.dueDate, b = second.dueDate;
    return a < b ? -1 : a > b ? 1 : 0;
});

console.log(arrSorted);
console.log(arrSorted2);
