var connection = require('../connection.js');

// '/user_data'
exports.userData = function(req, res){
    connection.query('SELECT username, horoscope, log FROM users WHERE userId = ?', req.query.userId,
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
    let numberOfPosts = req.query.numberOfPosts;
    let recentPosts = [];
    let totalPostCount = 0;

    connection.query('SELECT COUNT(*) AS totalCount FROM SocialPostsCreatedByUser',
        function (err, rows, fields) {
            if (err) throw err;

            totalPostCount = rows[0].totalCount;
        })

    connection.query('SELECT postid FROM SocialPostsCreatedByUser ORDER BY timeStamp LIMIT ?', parseInt(numberOfPosts),
        function (err, rows, fields) {
            if (err) throw err;

            for (let i = 0; i < Math.min(numberOfPosts, totalPostCount); ++i)
            {
                recentPosts.push(rows[i]);
            }

            res.send({
                "postIds": recentPosts
            })
        })
};

// '/get_post'
exports.getPost = function(req, res){
    connection.query('SELECT message, image, userId FROM SocialPostsCreatedByUser WHERE postId = ?', req.query.postId,
        function (err, rows, fields) {
            if (err) throw err;

            res.send({
                "message": rows[0].message,
                "image": rows[0].image,
                "userId": rows[0].userId
            })
        })
};