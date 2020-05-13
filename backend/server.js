var express    =  require("express");
var login =  require('./routes/loginroutes');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
require('./dbconnection');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Acess-Control-Allow-Headers,Authorization,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
});

var router = express.Router();

app.get('/', (req, res) => res.send('ho!'))

// test route
// router.get('/', function(req, res) {
//     res.json({ message: 'welcome to our upload module apis' });
// });
//route to handle user registration
// router.post('/register',login.register);

// router.get('/register',(res)=>{
//     console.log("hello");
// });

// router.post('/login',login.login)
// app.use('/api', router);

app.listen(8081,()=>{ 
    console.log("Server is Listening At Port 8081")  
})

