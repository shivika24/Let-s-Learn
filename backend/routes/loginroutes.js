const bcrypt=require('bcrypt-nodejs');
exports.register = async function(req,res){
    const password = req.body.spassword;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    console.log(req);
    var users={
       "sname":req.body.sname,
       "srollno":req.body.srno,
       "semail":req.body.semail,
       "spno":req.body.sphone,
       "syear":req.body.syear,
       "password":encryptedPassword
     }
    
    connection.query('INSERT INTO student SET ?',users, function (error, results, fields) {
      if (error) {
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
  exports.login = async function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM student WHERE email = ?',[email], async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length >0){
          const comparision = await bcrypt.compare(password, results[0].password)
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