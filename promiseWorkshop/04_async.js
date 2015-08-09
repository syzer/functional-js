var q = require('q');
var defer = q.defer();

defer.promise.then(console.log);

// executed in next event loop
defer.resolve("SECOND");
console.log('FIRST');
