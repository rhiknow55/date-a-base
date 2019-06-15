var connection = require('../connection.js');

// '/user_data'
exports.userData = function(req, res){
    connection.query('SELECT username, horoscope, log FROM users WHERE loginname = ?', req.query.loginName,
        function (err, rows, fields) {
            if (err) throw err;

            res.send({
                "username": rows[0].username,
                "horoscope": rows[0].horoscope,
                "log": rows[0].log
            })
        })
};

// '/retrieve_posts'
exports.retrievePosts = function(req, res){
    let recentPosts = [];

    let numberOfPosts = req.query.numberOfPosts;
    for (let i = 0; i < numberOfPosts; ++i)
    {
        recentPosts.push()
    }

    res.send({postIds: recentPosts})
};

// TODO: Method that retrieves recent posts from via sql
getRecentPosts = (numOfPosts) =>
{

}