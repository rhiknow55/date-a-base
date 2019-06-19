var connection = require('./connection.js');

//'/register'
exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "userId":req.body.userId,
    "loginName":req.body.loginName,
    "password":req.body.password,
    "username":req.body.username,
    "horoscope":req.body.horoscope,
    //"emailAddress":req.body.emailAddress,
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
exports.login = function(req,res){
  var loginName= req.body.loginName;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE loginName = ?',[loginName], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.sendStatus(400).send('error occurred');
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        res.status(200).json({userId : results[0].userId, username : results[0].username});
      }
      else{
        res.status(400).send('loginName and password does not match');
      }
    }
    else{
      res.status(404).send('loginName does not exits');
    }
  }
  });
}

