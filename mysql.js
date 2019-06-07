
//create connection to mysql
//todo: everything related to mysql is better to be written in another file (to make server.js look cleaner)
var mysql = require('mysql');

// //note: a database named "date-a-base" need to be created before connection
// //todo: for security reason (since this would be an open source project), don't put password in the code,
// // instead, write it in a separate file
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   //password: secret.mysql_password
//   password: "MySqlRoot-0605",
//   database: "date-a-base"
// });

// get password from file
// file name must be "secret", no extension
// it must be plaintext with only the password inside
var fs = require('fs');
var mysql_password = fs.readFileSync('secret', 'utf8');

// var con1 = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: mysql_password
// });

//create schema
// con1.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con1.query("CREATE DATABASE date-a-base", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//     con1.end();
//   });
// });
//con1.end();


//note: a database named "date-a-base" need to be created before connection
//todo: for security reason (since this would be an open source project), don't put password in the code,
// instead, write it in a separate file
con2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: mysql_password,
    // database: "date-a-base"
    database: "date-a-base"
});


// create tables
con2.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sqlCreateSA = "CREATE TABLE systemAdmins (userId INT PRIMARY KEY, loginName VARCHAR(255) NOT NULL UNIQUE" +
      ", password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, emailAddress VARCHAR(255) NOT NULL)";
  con2.query(sqlCreateSA, function (err, result) {
    if (err) console.log("Table systemAdmins already exist");
    else  console.log("Table systemAdmins created");
  });

  var sqlCreateUsers = "CREATE TABLE users (userId INT PRIMARY KEY, loginName VARCHAR(255) NOT NULL UNIQUE" +
      ", password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, emailAddress VARCHAR(255) NOT NULL" +
      ", birthday DATE NOT NULL, horoscope INT)";
  con2.query(sqlCreateUsers, function (err, result) {
    if (err) console.log("Table systemAdmins already exist");
    else console.log("Table users created");
  });

  var sqlCreateTestTable = "CREATE TABLE testTable (userId INT PRIMARY KEY, loginName VARCHAR(255) NOT NULL UNIQUE" +
      ", password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, emailAddress VARCHAR(255) NOT NULL" +
      ", birthday DATE NOT NULL, horoscope INT)";
  con2.query(sqlCreateTestTable, function (err, result) {
    if (err) console.log("Table testTable already exist");
    else console.log("Table testTable created");
  });

  //todo: create all other tables here
});


//sample data insertion
//all sql statements (except connection and table creation) should be in request handler methods
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   //var birthday = new Date('1988-02-10'); //todo: not working, null value inserted
//   //var horoscope = 1;//todo: e.g. userHoroscope = getHoroscope(birthday), use enum
//   var sql = "INSERT INTO users (userId, loginName, password, username, emailAddress, birthday, horoscope)" +
//       " VALUES (00011, 'jamieTestUser5', 'dateabase1', 'jamie test user', 'jamie@gmail.com', Date('1958-02-10'), 1)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

//con.end();//todo: we can't add this line here, error occurs, Error: Cannot enqueue Query after invoking quit.
