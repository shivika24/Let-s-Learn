var express    =  require("express");
var login =  require('./routes/loginroutes');
var handleFileRouter =  require('./routes/handlingFile');
var mcqRouter=require('./routes/mcq')
var profileRouter=require('./routes/profileSetting');
var viewtestdatafile=require('./routes/viewtestdatafile')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var nodemailer = require("nodemailer");
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
//test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
app.post('/register',login.register);
app.post('/tregister',login.tregister);
app.post('/handleFile',handleFileRouter.handleFile);
//app.post('/savelink',handleFileRouter.saveLink);
app.post('/testid',handleFileRouter.checkTestId);
app.post('/submittedques',handleFileRouter.submittedQues);

app.post('/checkt',handleFileRouter.checkt);

app.put('/savesetting',profileRouter.settings);
app.get('/phone',profileRouter.phone);

app.put('/savesetting1',profileRouter.settings1);
app.get('/phone1',profileRouter.phone1);
// app.get('/register',(res)=>{
//     console.log("hello");
// });
app.get('/mcq',mcqRouter.mcq);
app.get('/prevTot',mcqRouter.prevTot);
app.post('/login',login.login)
app.post('/tlogin',login.tlogin)
app.post('/notice',login.nnotice)
app.post('/getnotice',login.getnotice)
app.post('/deleten',login.ddelete)
app.post('/addtodo',login.todo)
app.post('/gettodo',login.gettodo)



app.post('/addtocalender',login.addtocalender)
app.post('/getcalender',login.getcalender)
app.post('/updatecalender',login.updatecalender)
app.post('/deletecalender',login.deletecalender)
app.post('/getallcalender',login.getallcalender)

app.post('/viewtestdatafile',viewtestdatafile.viewtestdata)







app.post('/deletetodo',login.tododelete)
app.post('/quote',login.addquote)
app.get('/getquote',login.getquote)
app.post('/testhistory',login.testhistory)
app.post('/checkpass',login.checkpassword)
app.post('/changepass',login.changepassword)
app.post('/testdetails',login.testdetails)

app.get('/getnotice1',login.getnotice1)
app.post('/checkpass1',login.checkpassword1)
app.post('/changepass1',login.changepassword1)
app.use('/api', router);

app.get('/getblog',login.getblog)
app.post('/viewblog',login.viewblog)
app.post('/getcomment',login.getcomment)
app.post('/addcomment',login.addcomment)


app.listen(8082,()=>{ 
    console.log("Server is Listening At Port 8082")  
})

//require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
var smtpTransport = nodemailer.createTransport({
    service:"Gmail",
    host: 'smtp.gmail.com',
    port:587,
    secure: false,
    auth:{
        user: "shivikasingla24@gmail.com",
        pass: "Shivika24." 
    }
})
  
var rand,mailOptions,host,link;


app.post('/send',function(req,res){
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
       // from : 'letsLearn@gmail.com',
        to : req.body.semail,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, info){
     if(error){
        console.log(error);
        res.end("error");
     }else{
        console.log("Message sent: " + info.response);
        res.end("sent");
         }
});
res.status(400).json({resType:102});
});

app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>"); 
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});




var mysqlConnection= require('./dbconnection');
// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mytest',
//     multipleStatements: true
//   });

  
app.get('/get', (req, res) => {
    let emp = req.body;
    mysqlConnection.query('SELECT * FROM event ',(err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.put('/post1', (req, res) => {
     let res1=req.body;
     console.log(res1.date);
     console.log(res1.month);
     mysqlConnection.query('SELECT * FROM event WHERE date = ? && month = ?', [res1.date,res1.month], (err, rows, fields) => {
        console.log(rows);
        if (!err)
        {
         res.send(rows);
        }
        else
            res.send('');
    })
});



app.get('/delete/:id', (req, res) => {
    mysqlConnection.query('Delete FROM event WHERE sn = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.put('/put', (req, res) => {

    let emp = req.body;
    mysqlConnection.query("INSERT INTO event (email,date,month,name,description) VALUES (?,?,?,?,?)",
    
                             [emp.email, emp.date, emp.month, emp.name , emp.description], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});


app.put('/putevent', (req, res) => {

    let emp = req.body;
    mysqlConnection.query("INSERT INTO blogg (name,college,course,blo,date,time,rate,count,email,image) VALUES (?,?,?,?,?,?,?,?,?,?)",
    
                             [emp.name, emp.college, emp.course, emp.blo , emp.date,emp.time,emp.rate,emp.count,emp.email],emp.image, (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});


app.put('/count', (req, res) => {
    let p = req.body;
    mysqlConnection.query(" UPDATE blogg SET count= count+1 WHERE sn = ?;",[p.id] ,(err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});



app.get('/getblogg', (req, res) => {
    mysqlConnection.query('Select * from blogg', (err, rows, fields) => {
        if (!err)
        {
            res.send(rows);
        }
        else
            console.log(err);
    })
});

app.put('/comment', (req, res) => {
    let p = req.body;
   
    mysqlConnection.query("INSERT INTO comment (bogid,comments) VALUES (?,?)",[p.id,p.temp], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});

app.get('/getcomment', (req, res) => {
    mysqlConnection.query('Select * from comment', (err, rows, fields) => {
        if (!err)
        {
        
            res.send(rows);
        }
        else
            console.log(err);
    })
});



