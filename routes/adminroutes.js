var connection = require('./connection.js');
var jwt = require('jsonwebtoken');
var secret = "secret";

jwtIsVerified = function(req){
    try{
        console.log(req);
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const payload = jwt.verify(token, secret);
        console.log(payload);
        return payload.isAdmin;
    }
    catch(e){
        return false;
    }
};

exports.delete_comment = function(req,res){
    if (jwtIsVerified(req)){
        connection.query('DELETE FROM commentsfrompostbyuser WHERE commentId = ?', [req.body.commentId], null,
        
        function (error, results, fields) {
            if (error) {
                res.sendStatus(400).send('error occurred');
            } else {
                res.sendStatus(200);
            }
        }
        );
    } else {
        res.sendStatus(401);
    }
}

exports.get_most_basic_users = function (req, res) {
    if (jwtIsVerified(req)){
        connection.query('SELECT * FROM users WHERE log > (SELECT AVG(log) from USERS)', null,
        
        function (error, results, fields) {
            if (error) {
                res.sendStatus(400).send('error occurred');
            } else {
                const users = new Array();
                results.forEach((r)=>{
                    users.push(r);
                })
                console.log(users);
                res.status(200).json(users);
            }
        }
        );
    } else {
        res.sendStatus(401);
    }
};

exports.get_all_users = function(req, res){
    if (jwtIsVerified(req)){
        connection.query('SELECT * FROM users', null,
        
        function (error, results, fields) {
            if (error) {
                res.sendStatus(400).send('error occurred');
            } else {
                const users = new Array();
                results.forEach((r)=>{
                    users.push(r);
                })
                console.log(users);
                res.status(200).json(users);
            }
        }
        );
    } else {
        res.sendStatus(401);
    }
};

exports.get_all_comments = function(req, res){
    if (jwtIsVerified(req)){
        connection.query('SELECT * from commentsfrompostbyuser', null,
        
        function (error, results, fields) {
            if (error) {
                res.sendStatus(400).send('error occurred');
            } else {
                const comments = new Array();
                results.forEach((r)=>{
                    comments.push(r);
                })
                console.log(comments);
                res.status(200).json(comments);
            }
        }
        );
    } else {
        res.sendStatus(401);
    }
}