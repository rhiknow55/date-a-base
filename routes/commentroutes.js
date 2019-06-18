var connection = require('./connection.js');

// '/retrieve_comments'
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
exports.addComment = function(req, res)
{
    var today = new Date().getTime();
    var comment = {
        "commentId": req.body.commentId,
        "message": req.body.message,
        "postId": parseInt(req.body.postId),
        "userId": parseInt(req.body.userId)
    }

    console.log(comment);

    connection.query('INSERT INTO CommentsFromPostByUser (commentId, message, postId, userId) VALUES (?, ?, ?, ?)',
        [comment.commentId, comment.message, comment.postId, comment.userId],

    function(err, rows, fields) {
        if (err) throw err;

        res.send({
            "code":200,
            "success":"comment added sucessfully"
        });
    })
}

// '/comments_made_on_post'
exports.commentsMadeOnPost = function(req, res)
{
    connection.query('SELECT COUNT(*) AS amount FROM CommentsFromPostByUser WHERE postId = ? GROUP BY userId HAVING userId = ?', [req.query.postId, req.query.userId],

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