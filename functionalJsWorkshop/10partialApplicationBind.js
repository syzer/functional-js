/**
 * Created by syzer on 6/1/2014.
 */
module.exports = function (namespace) {
    // this works too
//    var slice = Array.prototype.slice;
//    var namespace = slice.call(arguments);
//
//    function logger() {
//        var args = slice.call(arguments);
//        console.log(this[0], args.join(' '));
//    }
//    return logger.bind(namespace);

    return console.log.bind(console, namespace)
};


//var warn = module.exports('WARN:');
//warn('this is a warning message', 'with more info');
// WARN: this is a warning message with more info
