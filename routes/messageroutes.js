var connection = require('./connection.js');

// '/retrieve messages'
exports.retrieveMessages = function(req, res){
    let messages = [];

    let totalMessageCount = 0;

    connection.query('SELECT COUNT(*) AS totalCount FROM ChatMessageHasSessionCreatedBy WHERE userId = ? and chatsessionid = ?', [req.query.userId, req.query.roomId],
        function (err, rows, fields) {
            if (err) throw err;
            totalMessageCount = rows[0].totalCount;
        })

    // not used:==  message, chatsessionid, userid as senderid, timestamp
    connection.query('SELECT chatmessageid, message as text, chatsessionid, userid as senderId, timestamp FROM ChatMessageHasSessionCreatedBy WHERE userId = ? and chatsessionid = ? ORDER BY timestamp ASC', [req.query.userId, req.query.roomId],
        function (err, rows, fields) {
        if (err) throw err;

        for (let i = 0; i < totalMessageCount; ++i)
        {
            //console.log(rows[i]);
            messages.push(rows[i]);
        }

        res.send({
            "messages": messages,
            "number": totalMessageCount
        })
    })
};


exports.retrieveRoomIds = function(req, res){
    let rooms = [];



    // not used:==  message, chatsessionid, userid as senderid, timestamp
    connection.query('SELECT distinct sessionId, userId1, us.username as username1, userId2 , us2.username as username2 FROM UsersParticipateChat  INNER JOIN Users as us on UsersParticipateChat.userId1 = us.userId INNER JOIN Users as us2 on UsersParticipateChat.userId2 = us2.userId WHERE userId1 = ? OR userId2 = ?', [req.query.userId,req.query.userId],
        function (err, rows, fields) {
            if (err) throw err;




            for (let i = 0; i < rows.length; ++i)
            {
                if (req.query.userId == rows[i].userId1) {

                    rows[i].userId = rows[i].userId2
                    rows[i].userName = rows[i].username2
                } else {
                    rows[i].userId = rows[i].userId1
                    rows[i].userName = rows[i].username1

                }
                rooms.push(rows[i]);
            }

            res.send({
                "roomIds": rooms
            })
        })
};

// '/get_message'
exports.getMessages = function(req, res){

    connection.query('SELECT message, chatsessionid, userid as senderid, timestamp FROM ChatMessageHasSessionCreatedBy WHERE chatmessageid = ?', req.query.chatmessageid,
        function (err, rows, fields) {
            if (err) throw err;

            res.send({
                "text": rows[0].message,
               // "image": rows[0].image,
                "senderId": rows[0].senderid
            })
        })
};

// '/post_message'
exports.postMessage = function(req, res)
{
    var message = {
        "chatMessageId": req.body.chatMessageId,
        "message": req.body.message,
        "chatSessionId": parseInt(req.body.chatSessionId),
        "userId": parseInt(req.body.userId)
    }

    connection.query('INSERT INTO ChatMessageHasSessionCreatedBy (chatMessageId, message, chatSessionId, userId) VALUES (?, ?, ?, ?)',
        [message.chatMessageId, message.message, message.chatSessionId, message.userId],

        function(err, rows, fields) {
            if (err) throw err;

            res.send({
                "code":200,
                "success":"msg sent sucessfully"
            });
        })
}


// '/get_ph'
exports.getpH = function(req, res){

    connection.query('SELECT count(commentid) as count FROM CommentsFromPostByUser INNER JOIN SocialPostsCreatedByUser ON CommentsFromPostByUser.postId=SocialPostsCreatedByUser.postId WHERE CommentsFromPostByUser.userId = ?', req.query.userId,
        function (err, rows, fields) {
            if (err) throw err;

            res.send(rows[0].count)
        })
};