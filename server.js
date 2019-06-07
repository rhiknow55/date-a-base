'use strict';
const http = require('http');
const port = process.env.PORT || 1337;
const express = require('express');
const app = express();
const registration = require('/registration');


app.get('/', function (req, res) { res.send(`hello from ${y.x}`); });

// user registration @ /register
app.post('/register', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // ETC

    if (registration.username_available(username)) {
        registration.register_new_user(
            username, password, // ETC
        );
        res.send("success"); // TODO: use JSON
    }
    else {
        res.send("failed"); // TODO: use JSON
    }
});



app.listen(port, () => console.log(`listening on port ${port}`));


