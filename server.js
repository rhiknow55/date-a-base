const port = process.env.PORT || 5000;
var express    = require("express");
var login = require('./routes/loginroutes');
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
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// --

// create a GET route
app.get('/express_backend', (req, res) => {

    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// userdata route
app.get('/user_data', (req, res) => {
   res.send({
       username: "testUsername",
       horoscope: "testHoro",
       log: 100
   })
});

app.get('/retrieve_posts', (req, res) => {
    let recentPosts = [];

    let numberOfPosts = req.query.numberOfPosts;
    for (let i = 0; i < numberOfPosts; ++i)
    {
        recentPosts.push()
    }

    res.send({postIds: recentPosts})
});

// TODO: Method that retrieves recent posts from via sql
getRecentPosts = (numOfPosts) =>
{

}


//create connection to mysql
//todo: everything related to mysql is better to be written in another file (to make server.js look cleaner)
var mysql = require('mysql');

// get password from file
// file name must be "secret", no extension
// it must be plaintext with only the password inside
var fs = require('fs');
var mysql_password = fs.readFileSync('secret', 'utf8');

//note: a database named "date-a-base" need to be created before connection
//todo: for security reason (since this would be an open source project), don't put password in the code,
// instead, write it in a separate file
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: mysql_password,
    database: "date-a-base"
});
