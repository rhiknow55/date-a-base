var connection = require('./connection.js');

// '/user_data'
exports.userData = function(req, res){
    connection.query('SELECT username, horoscope, log, baseId FROM users WHERE userId = ?', req.query.userId,
        function (err, results, fields) {
            //if (err) throw err;
            if (results.length == 0){
                res.sendStatus(404);
            } else {
                res.status(200).json({
                    "username": results[0].username,
                    "horoscope": results[0].horoscope,
                    "log": results[0].log,
                    "baseId": results[0].baseId,
                })
            }
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

//'/has_all_trophies'
exports.usersHasAllTrophies = function(req,res){
  let usersHasAllTrophies = [];

  connection.query('SELECT userId From userhastrophy WHERE trophyId IN (SELECT trophyId FROM trophy) GROUP BY userId HAVING COUNT(*) = (SELECT COUNT(*) FROM trophy)',
        function (err, results, fields) {
            if (err) {
                res.sendStatus(400).send('error occurred');
              }else{
                    for (let i = 0; i < results.length; ++i)
                    {
                        usersHasAllTrophies.push(results[i]);
                    }
                    res.send({
                        "userIds": usersHasAllTrophies
                    })
              }
        });

};



