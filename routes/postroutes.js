var connection = require('./connection.js');

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

    connection.query('SELECT postId FROM SocialPostsCreatedByUser ORDER BY timeStamp DESC LIMIT ?', parseInt(numberOfPosts),
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

// '/retrieve_friend_posts/
exports.retrieveFriendPosts = function(req, res){

    connection.query('SELECT postId FROM SocialPostsCreatedByUser WHERE userId IN (SELECT userId2 FROM Friendwith WHERE userId1 = ?)', req.query.userId,
        function (err, rows, fields) {
            if (err) throw err;

            res.send({
                "postIds": rows
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

// '/add_post'
exports.addPost = function(req, res){
    var post = {
        "postId": req.body.postId,
        "message": req.body.message,
        "userId": parseInt(req.body.userId)
    }

    connection.query('INSERT INTO SocialPostsCreatedByUser (postId, message, userId) VALUES (?, ?, ?)',
        [post.postId, post.message, post.userId],

        function(err, rows, fields) {
            if (err) throw err;

            res.send({
                "code":200,
                "success":"post added sucessfully"
            });
        })
}

// '/posts_made_by_user'
exports.postsMadeByUser = function(req, res)
{
    connection.query('SELECT COUNT(*) AS amount FROM SocialPostsCreatedByUser WHERE userId = ?', req.query.userId,

        function (err, rows, fields) {
            if (err) throw err;

            if (rows.length > 0)
                res.send({
                    "amount": rows[0].amount
                })
            else
                res.send({
                    "amount": 0
                })
        })
}

// '/like_post'
exports.likePost = function(req, res)
{
    connection.query('INSERT INTO UserLikesPost (userId, postId) VALUES (?, ?)',
        [req.body.userId, req.body.postId],

        function(err, rows, fields) {
            if (err) throw err;

            res.send({
                "code":200,
                "success":"like added sucessfully"
            });
        })
}

// '/unlike_post'
exports.unlikePost = function(req, res)
{
    connection.query('DELETE FROM UserLikesPost WHERE userId = ? AND postId = ?',
        [req.body.userId, req.body.postId],

        function(err, rows, fields) {
            if (err) throw err;

            res.send({
                "code":200,
                "success":"like deleted sucessfully"
            });
        })
}

// '/get_if_like'
exports.getIfLike = function(req, res)
{
    connection.query('SELECT * FROM UserLikesPost WHERE userId = ? AND postId = ?', [req.query.userId, req.query.postId],

        function(err, rows, fields) {
            if (err) throw err;

            if (rows.length > 0)
                res.send({
                    "liked": true
                });
            else
                res.send({
                    "liked": false
                });
        })
}