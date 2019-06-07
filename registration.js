const db = require('/db');
const bcrypt = require('bcrypt'); //https://www.npmjs.com/package/bcrypt
const saltRounds = 10; // higher the slower and more secure

const register_new_user = function (username, password /* add other info here */) {
    bcrypt.hash(password, saltRounds).then(function (hash) {
        db.register_new_user(username, hash, /* add other info here */);
    });
};

const username_available = function (username) {
    return db.username_available(username);
};

module.exports.username_available = username_available;
module.exports.register_new_user = register_new_user;