var connection = require('./connection.js');

// '/user_data'
exports.userData = function(req, res){
    connection.query('SELECT username, horoscope, log, baseId FROM users WHERE userId = ?', req.query.userId,
        function (err, rows, fields) {
            if (err) throw err;

            res.send({
                "username": rows[0].username,
                "horoscope": rows[0].horoscope,
                "log": rows[0].log,
                "baseId": rows[0].baseId,
            })
        })
};

//'/get_trophies'
exports.retrieveTrophies = function(req,res){
  let userId= req.query.userId;
  let userTrophies = [];
  // todo: order by tropyId
  connection.query('SELECT trophyId FROM userhastrophy WHERE userId = ?',[userId], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.sendStatus(400).send('error occurred');
  }else{
        for (let i = 0; i < results.length; ++i)
        {
            userTrophies.push(results[i]);
        }

        res.send({
            "trophyIds": userTrophies
        })
  }
  });
};


