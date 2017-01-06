/**
 * Created by syzer on 10/27/2014.
 */

// monads for dynamic type safety
exports.index = (req, res) =>
    // here db call to get users
    res.status(200, [
        { id: 1 },
        { id: 2, email: 'some@that.loggedin.com' }
    ])

exports.index = (req, res) =>
    // here db call to get users
    res.status(200).json([
        { id: 1 },
        { id: 2, email: 'some@that.loggedin.com' }
    ])
