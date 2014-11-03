/**
 * Created by syzer on 10/27/2014.
 */

// monads for dynamic type safety
exports.index = function (req, res) {
    // here db call to get users
    var users = [
        {id: 1},
        {id: 2, email: 'some@that.loggedin.com'}
    ];

    res.status(200, users);
};

exports.index = function (req, res) {
    // here db call to get users
    var users = [
        {id: 1},
        {id: 2, email: 'some@that.loggedin.com'}
    ];

    res.status(200).json(users);
};
