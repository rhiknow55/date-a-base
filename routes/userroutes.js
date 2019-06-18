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