const config=require('config');
const jwt=require('jsonwebtoken');
var con= require('./../dbconnection');
var login =  require('./routes/loginroutes');
async function auth(req,res,next)  //to get token sent from react,postman or frontend etc
{
  const token=req.header('x-auth-token');
   // const token = req.cookies.token || '';
   //check for token
   if(!token) return res.status(401).json({msg:'Authorisation denied.You need to login'}); //401 error for unauthorized 
   
   //verify
   try
      {
          const decoded=jwt.verify(token,config.get('jwtSecret'));
          console.log(decoded)
          var user;
         con.query('SELECT semail FROM student WHERE semail = ?',decoded.id, async function (error, results, fields) {
              user=results;
         })
         console.log(user);
          req.user=user;//add user to payload
          next();
      }
   catch(e){
      console.log('hello i am error ' + e)
   }
}
module.exports=auth;