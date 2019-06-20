var connection = require('./connection.js');
var jwt = require('jsonwebtoken');
var secret = "secret";

//'/register'
exports.register = function(req,res){
  var today = new Date();

  hashCode = function(s) {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) + h + s.charCodeAt(i++) | 0;
    return Math.abs(h);
  };
  var newUserId = hashCode(req.body.loginName);

  console.log(newUserId)
  users={
    "userId":newUserId,
    "loginName":req.body.loginName,
    "password":req.body.password,
    "username":req.body.username,
    // "horoscope":req.body.horoscope,
    "log":0,
    "birthday":req.body.birthday,
    "baseId":1,
    "created":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

//'/login'
exports.login = function (req, res) {
    var loginName = req.body.loginName;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE loginName = ?', [loginName], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.sendStatus(400).send('error occurred');
        } else {
            // console.log('The solution is: ', results);
            console.log(results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    let token = jwt.sign({ userId: results[0].userId, isAdmin: false }, secret);
                    res.status(200).json({ userId: results[0].userId, username: results[0].username, jwt: token, isAdmin: false });
                }
            }
            else {
                connection.query('SELECT * FROM systemadmins WHERE loginNAme = ?', [loginName], function(err, results, field){
                    if (err){
                        res.sendStatus(400).send('error occurred');
                    } else {
                        if (results.length > 0){
                            if (results[0].password == password) {
                                let token = jwt.sign({ userId: results[0].userId, isAdmin: true }, secret);
                                res.status(200).json({ userId: results[0].userId, username: results[0].username, jwt: token, isAdmin: true });
                            }
                        } else {
                            res.status(404).send('loginName does not exits');
                        }
                    }
                })
            }
        }
    });
}

