var express    =  require("express");
var login =  require('./routes/loginroutes');
var handleFileRouter =  require('./routes/handlingFile');
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
<<<<<<< HEAD
app.use('/handleFile',handleFileRouter);
// test route
// router.get('/', function(req, res) {
//     res.json({ message: 'welcome to our upload module apis' });
// });
=======

//test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
>>>>>>> 71c50651e5aba474f093213c1be38587be0f8f2a
//route to handle user registration
app.post('/register',login.register);
app.post('/tregister',login.tregister);

// app.get('/register',(res)=>{
//     console.log("hello");
// });

app.post('/login',login.login)
app.use('/api', router);

app.listen(8082,()=>{ 
    console.log("Server is Listening At Port 8082")  
})

