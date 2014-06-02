/**
 * Created by syzer on 6/1/2014.
 */

function loadUsers(userIds, load, done) {
    var users = [];
    var finished = 0;

    userIds.forEach(function(user, i) {
        load(user, function (user) {
            users[i] = user;
            if (++finished === userIds.length) {
                return done(users);
            }
        })
    });
}

module.exports = loadUsers;
