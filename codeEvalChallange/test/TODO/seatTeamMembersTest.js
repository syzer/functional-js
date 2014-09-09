/**
 * Created by syzer on 8/27/2014.
 */
/**
 Seat your team members

 Challenge Description:

 Your team is moving to a new office. In order to make it feel comfortable on a new place you decided to give the possibility to pick the places where they want to sit. After the team visited the new office, each team member gave you a list of working places that he/she would like to occupy. Your goal is to determine a possibility of making all of your team members feel comfortable according to those lists.

 All working places in the new office are numbered from 1 to N. And each team member gave you the list which contained the places in unsorted order.
 Input sample:

 Your program should accept as its first argument a path to a filename. Each line of the file contains an integer N of available places in the office as the first digit and the lists of places that have been chosen by each team member. These lists are enclosed by square brackets. E.g.

 4; 1:[1, 3, 2], 2:[1], 3:[4, 3], 4:[4, 3]
 3; 1:[1, 3, 2], 2:[1], 3:[1]

 Output sample:

 For each line of input print out the simple "Yes" or "No" answer for the following question: "Is there a possibility to make all of your team members feel comfortable at the new office?". E.g.
 Yes
 No

 */

var expect = require('chai').expect;
var SRC_DIR = './../../src/hard/'; // run on over the test

var lib = require(SRC_DIR + 'seatTeamMembers');
var _ = require('lodash');

var input = [
    '4; 1:[1, 3, 2], 2:[1], 3:[4, 3], 4:[4, 3]',
    '3; 1:[1, 3, 2], 2:[1], 3:[1]'
].join('\n');

var inputSmall = '4; 1:[1, 3, 2], 2:[1], 3:[4, 3], 4:[4, 3]';
//var inputSmall = '3; 1:[1, 3, 2], 2:[1], 3:[1]';

var output = [
    'Yes',
    'No'
].join('\n');


describe('nice angle - angle conversion', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can unflatten array parent child, parent children', function (done) {
        var arr = [
            {'id': 1, 'parentId': 0},
            {'id': 2, 'parentId': 1},
            {'id': 3, 'parentId': 1},
            {'id': 4, 'parentId': 2},
            {'id': 5, 'parentId': 0},
            {'id': 6, 'parentId': 0},
            {'id': 7, 'parentId': 4}
        ];

        var expected = [
            {
                "children": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "id": 7,
                                        "parentId": 4
                                    }
                                ],
                                "id": 4,
                                "parentId": 2
                            }
                        ],
                        "id": 2,
                        "parentId": 1
                    },
                    {
                        "id": 3,
                        "parentId": 1
                    }
                ],
                "id": 1,
                "parentId": 0
            },
            {
                "id": 5,
                "parentId": 0
            },
            {
                "id": 6,
                "parentId": 0
            }
        ];

        var out = lib.unflatten(arr);
        expect(out).eql(expected);
        done();
    });

    it('can extract arrays from input', function (done) {
        var out = lib.extractArrays(inputSmall);
        expect(out).eql([
            [ 1, 3, 2 ],
            [ 1 ],
            [ 4, 3 ],
            [ 4, 3 ]
        ]);
        done();
    });

    it('can run on small sample', function (done) {
        var out = lib.run(inputSmall);
        console.log('\nTOTAL:\n', out);
//        expect(out).eql(output);
        done();
    });


});
