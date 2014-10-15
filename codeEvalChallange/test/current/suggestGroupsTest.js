/**
 * Created by syzer on 8/27/2014.
 */
/*Suggest Groups
 Challenge Description:

 You may have noticed that a new feature was added to our web site – user groups. So, this challenge is about joining groups.

 You are given a list of users of a social network, friends of each user, and groups the user participates in.

 To help users find the most interesting groups, we suggest them joining the groups where ≥50% of their friends participate.

 Your task is to write a program which finds a list of suggested groups for each user.
 Input sample:

 The first argument is a file that contains the information about each user, one user per line. The line is delimited by colon ‘:’ into three parts: user name, list of friends, and list of groups. The items in each part are delimited by comma ‘,’.

 For example:
 Output sample:

 Print to stdout the list of suggested groups for each user.
 The list of users and the list of groups for each user must be
 sorted alphabetically.

 For example:

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/medium/'; // run on over the test

var lib = require(SRC_DIR + 'suggestGroups');
var _ = require('lodash');

var input = [
    'Amira:Isaura,Lizzie,Madalyn,Margarito,Shakira,Un:Driving,Mineral collecting',
    'Elliot:Isaura,Madalyn,Margarito,Shakira:Juggling,Mineral collecting',
    'Isaura:Amira,Elliot,Lizzie,Margarito,Verla,Wilford:Juggling',
    'Lizzie:Amira,Isaura,Verla:Driving,Mineral collecting,Rugby',
    'Madalyn:Amira,Elliot,Margarito,Verla:Driving,Mineral collecting,Rugby',
    'Margarito:Amira,Elliot,Isaura,Madalyn,Un,Verla:Mineral collecting',
    'Shakira:Amira,Elliot,Verla,Wilford:Mineral collecting',
    'Un:Amira,Margarito,Wilford:',
    'Verla:Isaura,Lizzie,Madalyn,Margarito,Shakira:Driving,Juggling,Mineral collecting',
    'Wilford:Isaura,Shakira,Un:Driving'
].join('\n');

var output = [
    'Isaura:Driving,Mineral collecting',
    'Lizzie:Juggling',
    'Madalyn:Juggling',
    'Margarito:Driving,Juggling',
    'Shakira:Driving,Juggling',
    'Un:Driving,Mineral collecting'
].join('\n');

describe('suggest groups', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can run', function (done) {
        var out = lib.runAll(input);
//        console.log(out);
        expect(out).eql(output);
        done();
    });
});
