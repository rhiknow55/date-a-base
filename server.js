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

// loginroutes.js
var login = require('./routes/loginroutes');
app.post('/register', login.register);
app.post('/login', login.login);
// app.use('/api', router);

// userroutes.js
var user = require('./routes/userroutes');
app.get('/user_data', user.userData)

// postroutes.js
var post = require('./routes/postroutes');
app.get('/retrieve_posts', post.retrievePosts);
app.get('/get_post', post.getPost);
app.post('/add_post', post.addPost);
app.get('/posts_made_by_user', post.postsMadeByUser);

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