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