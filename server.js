const port = process.env.PORT || 5000;
var express    = require("express");
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





var router = express.Router();
// test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

// ADMIN SECTION BEGIN --------
var admin = require('./routes/adminroutes');
app.get('/admin/users', admin.get_all_users);
app.get('/admin/most_basic_users', admin.get_most_basic_users);
app.get('/admin/comments', admin.get_all_comments);
app.post('/admin/delete_comment', admin.delete_comment);
// ADMIN SECTION END -----


// loginroutes.js
var login = require('./routes/loginroutes');
app.post('/register', login.register);
app.post('/login', login.login);
// app.use('/api', router);

// userroutes.js
var user = require('./routes/userroutes');
app.get('/user_data', user.userData)
app.get('/get_trophies', user.retrieveTrophies)

// postroutes.js
var post = require('./routes/postroutes');
app.get('/retrieve_posts', post.retrievePosts)
app.get('/get_post', post.getPost)

// commentroutes.js
var comment = require('./routes/commentroutes');
app.get('/retrieve_comments', comment.retrieveComments);
app.post('/add_comment', comment.addComment);
app.get('/comments_made_on_post', comment.commentsMadeOnPost);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {

    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});