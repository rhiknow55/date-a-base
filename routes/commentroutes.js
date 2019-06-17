var connection = require('./connection.js');

// 'retrieve_comments'
exports.retrieveComments = function(req, res)
{
    connection.query('SELECT * FROM CommentsFromPostByUser WHERE postId = ? ORDER BY timeStamp', req.query.postId,
        function (err, rows, fields) {
            if (err) throw err;

            let commentIds = [];
            for (let i = 0; i < rows.length; ++i)
            {
                commentIds.push(rows[i]);
            }

            res.send({
                "commentIds": commentIds
            })
        })
}

// '/add_comment'