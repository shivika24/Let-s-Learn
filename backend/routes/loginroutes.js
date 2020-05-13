var bcrypt = require ('bcrypt');
const saltRounds=10;
var con= require('./../dbconnection');

module.exports.register = async function(req,res){
    const password = req.body.spassword;
    const password1 = req.body.spassword1;
    if(password==password1)
    {
      const encryptedPassword = await bcrypt.hash(password, saltRounds)
      const encryptedPassword1 = await bcrypt.hash(password1, saltRounds)
      var users={
         "sname":req.body.sname,
         "srollno":req.body.srollno,
         "semail":req.body.semail,
         "spno":req.body.spno,
         "syear":req.body.syear,
         "spassword":encryptedPassword,
         "spassword1":encryptedPassword1
       }
      con.query("SELECT COUNT(*) AS cnt FROM student WHERE semail = ? " , users.semail , function(err , data){
         if(err){
             console.log(err); 
         }   
         else{
             if(data[0].cnt > 0){  
                   console.log("account already exists...Please Login");
                   //redirect to login page
             }else{
              var sql = "INSERT INTO `student`(`sname`,`srollno`,`semail`,`spno`, `syear`, `spassword`) VALUES ('" + users.sname + "','" + users.srollno + "','" + users.semail + "','" + users.spno + "','" + users.syear + "','" +users.spassword +"')";
              var query = con.query(sql, function(err, result) {  
                if (err) {
                  res.send({
                    "code":400,
                    "failed":"error ocurred"
                  })
                } else {
                  res.send({
                    "code":200,
                    "success":"user registered sucessfully"
                      });
                  }
              });  
            }       
             }
      })
      
    }
    else
    {
    //display alert and page should be refreshed
    console.log("PASSWORDS DO NOT MATCH");
    }
  }
  module.exports.tregister = async function(req,res){
    const tpassword = req.body.tpassword;
    const tpassword1 = req.body.tpassword1;
    if(tpassword==tpassword1)
    {
      const tencryptedPassword = await bcrypt.hash(tpassword, saltRounds)
      const tencryptedPassword1 = await bcrypt.hash(tpassword1, saltRounds)
      var users={
         "tname":req.body.tname,
         "tid":req.body.tid,
         "temail":req.body.temail,
         "tpno":req.body.spno,
         "tpassword":tencryptedPassword,
         "tpassword1":tencryptedPassword1
       }
      con.query("SELECT COUNT(*) AS cnt FROM teacher WHERE temail = ? " , users.temail , function(err , data){
         if(err){
             console.log(err); 
         }   
         else{
             if(data[0].cnt > 0){  
                   console.log("account already exists...Please Login");
                   //redirect to login page
             }else{
              var sql = "INSERT INTO `teacher`(`tname`,`tid`,`temail`,`tpno`, `tpassword`) VALUES ('" + users.tname + "','" + users.tid + "','" + users.temail + "','" + users.tpno + "','" +users.tpassword +"')";
              var query = con.query(sql, function(err, result) {  
                if (err) {
                  res.send({ 
                    "code":400,
                    "failed":"error ocurred"
                  })
                } else {
                  res.send({
                    "code":200,
                    "success":"teacher registered sucessfully"
                      });
                  }
              });  
            }       
             }
      })
      
    }
    else
    {
    //display alert and page should be refreshed
    console.log("PASSWORDS DO NOT MATCH");
    }
  }
  module.exports.login = async function(req,res){
    var semail= req.body.semail;
    var spassword = req.body.spassword;
    con.query('SELECT * FROM student WHERE semail = ?',semail, async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length >0){
          const comparision = await bcrypt.compare(spassword, results[0].spassword)
          if(comparision){
              res.send({
                "code":200,
                "success":"login sucessfull"
              })
          }
          else{
            res.send({
                 "code":204,
                 "success":"Email and password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Email does not exits"
              });
        }
      }
      });
  }