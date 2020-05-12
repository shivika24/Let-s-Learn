const express = require("express"); 
const bodyparser = require("body-parser");
require('./dbconnection');
//const books = require('./routes/books');
var app = express();     
const cors = require('cors')
app.use(cors())
app.use(bodyparser.json());      
app.use("*",(req,res,next)=>{
    console.log("MiddleWare is Called");
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Acess-Control-Allow-Headers,Authorization,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();                   
})

//app.use("/books",books);

app.listen(8081,()=>{ 
    console.log("Server is Listening At Port 8081")  
})

