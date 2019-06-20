var connection = require('./connection.js');


// '/get_ph'
exports.getpH = function(req, res){

    connection.query('SELECT count(commentid) as count FROM CommentsFromPostByUser INNER JOIN SocialPostsCreatedByUser ON CommentsFromPostByUser.postId=SocialPostsCreatedByUser.postId WHERE CommentsFromPostByUser.userId = ?', req.query.userId,
        function (err, rows, fields) {
            if (err) throw err;

            res.send(rows[0].count)
        })
};


