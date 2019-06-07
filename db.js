const mysql = require('mysql');
const mysql_password = fs.readFileSync('secret', 'utf8');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: mysql_password,
    database: "date-a-base"
});

const register_new_user = function (username, hash_of_password, /* other user info here */) {
    let sql = `INSERT INTO users (${username}, ${hash_of_password})`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`inserted user username=${username} into users`);
    });
};

const username_available = function (username) {
    let sql = `SELECT COUNT(username=${username}) FROM users`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(``);
        return result == 0; // TODO: is the result just an int?
    });
};

module.exports.username_available = username_available;
module.exports.register_new_user = register_new_user;