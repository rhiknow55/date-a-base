const express = require('express');
var mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;

var con = mysql.createConnection({
    host: "35.233.237.72",
    user: "root",
    password: "xxx",
    db: "job"
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "Create table `test`";
    con.query(sql, function (err, result)
    {
        if (err) throw err;
        console.log("Result: " + result);
    })
});
con.end();

// create a GET route
app.get('/express_backend', (req, res) => {
    // Connect


    res.send({ express: 'Result: ' });
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