/**
 * Created by syzer on 5/31/2014.
 */
function checkUsersValid(goodUsers) {
    return function (submittedUsers) {
        // SOLUTION GOES HERE
        submitedUsers = submitedUsers.every(function (user) {
            //console.log(user);
            return goodUsers.some(function (goodUser) {
                return goodUser.id === user.id;
            });
        });
        //'found 8 good lists!';
        return submitedUsers;
    };
}

module.exports = checkUsersValid;
