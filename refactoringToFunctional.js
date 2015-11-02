var _ = require('lodash');
var phoneShowers = [{showerID: 1, data: 2}, {showerID: 2}, {showerID: 3, data: 2}];
var missingIds = [2, 4];
var user = 'me';
var device = 'fisrtDevice';

function logArgs(data) {
    console.log(arguments);
}
var apiWrapper = {createExtraction: logArgs};
var test = _.xor(
    phoneShowers
        .filter(function (shower) {
            return _.contains(missingIds, shower.showerID);
        }).map(function (extraction) {
            apiWrapper.createExtraction(user, device, extraction);
            return extraction.showerID;
        }), missingIds
);

console.log(test);

var allMissing = _.curryRight(function(missingIds, phoneShowers, user, device) {
    return phoneShowers
        .filter(function (shower) {
            return _.contains(missingIds, shower.showerID);
        }).map(function (extraction) {
            apiWrapper.createExtraction(user, device, extraction);
            return extraction.showerID;
        });
});

var allMissingForUserDevice = allMissing(phoneShowers, user, device);

var test2 = _.flow(allMissingForUserDevice, _.xor, _.size);

console.log(test2(missingIds));


///////////////////////////////////////////

var pushToServerAndGetId = function(user, device, extraction) {
    apiWrapper.createExtraction(user, device, extraction);
    return extraction.showerID;
};
var pushDataGetId = _.curry(pushToServerAndGetId)(user, device);

function serverMissingId(shower) {
    return _.contains(missingIds, shower.showerID);
}

var allMissing = function(phoneShowers, missingIds) {
    return phoneShowers
        .filter(serverMissingId)
        .map(pushDataGetId);
};

var allMissingPhoneShowers = _.curry(allMissing)(phoneShowers);

var test2 = _.flow(allMissingPhoneShowers, _.xor);

console.log(test2(missingIds));


