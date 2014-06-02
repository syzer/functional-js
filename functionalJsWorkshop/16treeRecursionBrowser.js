/**
 * Created by syzer on 6/1/2014.
 */
function getDependencies(tree, acc) {
    acc = acc || [];            // pass by reference
    var dependencies = tree.dependencies || [];
    Object.keys(dependencies).forEach(function(dep) {
        var key = dep + '@' + tree.dependencies[dep].version;
        if (acc.indexOf(key) === -1) acc.push(key);
        getDependencies(tree.dependencies[dep], acc);
    });
    return acc.sort();
}
module.exports = getDependencies;
//var loremIpsum = {
//    "name": "lorem-ipsum",
//    "version": "0.1.1",
//    "dependencies": {
//        "optimist": {
//            "version": "0.3.7",
//            "dependencies": {
//                "wordwrap": {
//                    "version": "0.0.2"
//                }
//            }
//        },
//        "inflection": {
//            "version": "1.2.6"
//        }
//    }
//};
//console.log(getDependencies(loremIpsum));
