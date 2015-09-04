"use strict";

var items = { name: "Foo",
    login: [ 1407574431, 140753421 ]
};

// _.template(text)(data)
// _.template('<b><%= value %></b>')({ value: 'attention' });
// '<b>attention</b>'

var out = 'Hello Foo (logins: 2)';

var _ = require('lodash');

function template(items) {
    return _.template('Hello <%= name %> (logins: <%= login.length %>)')(items);
}

module.exports = template;
//console.log(template(items));
