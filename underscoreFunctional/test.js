function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}
log("echo");
var x=5;
console.log(x);