const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {

    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

/*
class Square {
    constructor(height, width)
    {
        this.height = height;
        this.width = width;
    }
}
// Ryan test
app.get('/ryan_test', (req, res) => {
    const square = new Square(10, 50);
    res.send({ express: square })
});*/


//create connection to mysql
//todo: everything related to mysql is better to be written in another file (to make server.js look cleaner)
var mysql = require('mysql');

// get password from file
// file name must be "secret", no extension
// it must be plaintext with only the password inside
var fs = require('fs');
var mysql_password = fs.readFileSync('secret', 'utf8');

//note: a database named "date-a-base" need to be created before connection
//todo: for security reason (since this would be an open source project), don't put password in the code,
// instead, write it in a separate file
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: mysql_password,
    database: "date-a-base"
});

//create tables
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sqlCreateSA = "CREATE TABLE systemAdmins (userId INT PRIMARY KEY, loginName VARCHAR(255) NOT NULL UNIQUE" +
//       ", password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, emailAddress VARCHAR(255) NOT NULL)";
//   con.query(sqlCreateSA, function (err, result) {
//     if (err) throw err;
//     console.log("Table systemAdmins created");
//   });
//
//   var sqlCreateUsers = "CREATE TABLE users (userId INT PRIMARY KEY, loginName VARCHAR(255) NOT NULL UNIQUE" +
//       ", password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, emailAddress VARCHAR(255) NOT NULL" +
//       ", birthday DATE NOT NULL, horoscope INT)";
//   con.query(sqlCreateUsers, function (err, result) {
//     if (err) throw err;
//     console.log("Table users created");
//   });
//
//   //todo: create all other tables here
// });


//sample data insertion
//all sql statements (except connection and table creation) should be in request handler methods
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    //var birthday = new Date('1988-02-10'); //todo: not working, null value inserted
    //var horoscope = 1;//todo: e.g. userHoroscope = getHoroscope(birthday), use enum
    var sql = "INSERT INTO users (userId, loginName, password, username, emailAddress, birthday, horoscope)" +
        " VALUES (00011, 'jamieTestUser5', 'dateabase1', 'jamie test user', 'jamie@gmail.com', Date('1958-02-10'), 1)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

//con.end();//todo: we can't add this line here, error occurs, Error: Cannot enqueue Query after invoking quit.
