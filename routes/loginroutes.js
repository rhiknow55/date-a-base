var mysql      = require('mysql');
var fs = require('fs');
var mysql_password = fs.readFileSync('secret', 'utf8');

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

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "userId":req.body.userId,
    "loginName":req.body.loginName,
    "password":req.body.password,
    "username":req.body.username,
    "emailAddress":req.body.emailAddress,
    "birthday":req.body.birthday,
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

exports.login = function(req,res){
  var loginName= req.body.loginName;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE loginName = ?',[loginName], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":400,
          "success":"loginName and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":404,
        "code":404,
        "success":"loginName does not exits"
          });
    }
  }
  });
}

