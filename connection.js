// This file creates a connection to the SQL server.
// In order to use the connection, just import it (refer to loginroutes.js) and call it connection.

var mysql      = require('mysql');
var fs = require('fs');
var mysql_password = fs.readFileSync('secret', 'utf8');

console.log(`the password from file: ${mysql_password}`);

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : mysql_password,
    database : 'date-a-base'
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ... ");
    }
});

module.exports = connection;