/**
 * Created by syzer on 6/1/2014.
 */
var slice = Array.prototype.slice;

function logger(namespace) {
    return function namespacedLogger(/*args*/){
        var args = slice.call(arguments);
        console.log(namespace, args.join(' '));
        // or simply
        // console.log.apply(console, [namespace].concat(slice.call(arguments)))
    };
}

module.exports = logger;

//var info = logger('INFO:');
//info('this is an info message');
//info('this is an info message', 'blabla');
