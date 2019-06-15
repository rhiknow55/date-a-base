var connection = require('../connection.js');

// '/user_data'
exports.userData = function(req, res){
    res.send({
        username: "testUsername",
        horoscope: "testHoro",
        log: 100
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