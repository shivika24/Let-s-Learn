var bcrypt = require ('bcrypt');
const saltRounds=10;
var con= require('./../dbconnection');
const config=require('config');
const readXlsxFile = require('read-excel-file/node');
const jwt=require('jsonwebtoken');

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
              return res.status(400).json({resType:0});
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
         "tpno":req.body.tpno,
         "tpassword":tencryptedPassword,
         "tpassword1":tencryptedPassword1
       }
      con.query("SELECT COUNT(*) AS cnt FROM teacher WHERE temail = ? " , users.temail , function(err , data){
         if(err){
             console.log(err); 
         }   
         else{
             if(data[0].cnt > 0){  
               return res.status(400).json({resType:0});
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
                    "success":"teacher registered sucessfully",
                      });
                  }
              });  
            }       
             }
      })
      
    }
    else
    {
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
          console.log(results[0].spassword);
          console.log(spassword);        
          let comparision = await bcrypt.compare(spassword, results[0].spassword)
          console.log(comparision);
          if(comparision){
            const token = jwt.sign(
              {id:results[0].semail},    //payload
              config.get('jwtSecret'),
              {expiresIn:3600}
              );
              res.send({
                "code":200,
                "success":"login sucessfull",
                token,
                user:{id:results[0].semail,name:results[0].sname,type:"student"}
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
    module.exports.tlogin = async function(req,res){
      var temail= req.body.temail;
      var tpassword = req.body.tpassword;
      con.query('SELECT * FROM teacher WHERE temail = ?',temail, async function (error, results, fields) {
        if (error) {
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          if(results.length >0){    
            let comparision = await bcrypt.compare(tpassword, results[0].tpassword)

            if(comparision){
              const token = jwt.sign(
                {id:results[0].temail},    //payload
                config.get('jwtSecret'),
                {expiresIn:3600}
                );
                res.send({
                  "code":200,
                  "success":"login sucessfull",
                  token,
                  user:{id:results[0].temail,name:results[0].tname,type:"teacher",tid:results[0].tid}
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
  
      module.exports.nnotice = async function(req,res){
        var d=new Date().toISOString().slice(0, 19).replace('T',' ');
        var users={
             "email":req.body.email,
             "data":req.body.data,
             "date":d
           }
           console.log(users);

                  var sql = "INSERT INTO `notifications`(`email`,`data`,`date`) VALUES ('" + users.email + "','" + users.data + "','" + users.date  +"')";
                  var query = con.query(sql, function(err, result) {  
                    if (err) {
                      return res.status(400).json({code:0});
                    } else {
                      return res.status(400).json({code:1});
                      }
                  });         
                
      }

      module.exports.getnotice = async function(req,res){
        var users={
             "email":req.body.email,
           }
           console.log(users);

           con.query("SELECT *  FROM notifications WHERE email = ? " , users.email , function(err , data){
            if (err) {
              return res.status(400).json({code:0});
            } else {
              return res.status(400).json({code:data});
              } 
          });
        }

      module.exports.ddelete = async function(req,res){
        var users1={
             "sno":req.body.sno,
           }
           console.log(users1);

           con.query("DELETE FROM notifications WHERE sno = ? " , users1.sno , function(err , data){
            if (err) {
              return res.status(400).json({code:0});
            } else {
              return res.status(400).json({code:1});
              } 
          });
        }


        module.exports.todo = async function(req,res){
          var d=new Date().toISOString().slice(0, 19).replace('T',' ');
          var users={
               "email":req.body.email,
               "data":req.body.data,
               "date":d
             }
             console.log(users);
  
                    var sql = "INSERT INTO `todolist`(`email`,`data`,`date`) VALUES ('" + users.email + "','" + users.data + "','" + users.date + "')";
                    var query = con.query(sql, function(err, result) {  
                      if (err) {
                        return res.status(400).json({code:0});
                      } else {
                        return res.status(400).json({code:1});
                        }
                    });         
                  
        }
  
        module.exports.gettodo = async function(req,res){
          var users={
               "email":req.body.email,
             }
             console.log(users);
  
             con.query("SELECT *  FROM todolist WHERE email = ? " , users.email , function(err , data){
              if (err) {
                return res.status(400).json({code:0});
              } else {
                return res.status(400).json({code:data});
                } 
            });
          }

          module.exports.tododelete = async function(req,res){
            var users1={
                 "sno":req.body.sno,
               }
               console.log(users1);
    
               con.query("DELETE FROM todolist WHERE sno = ? " , users1.sno , function(err , data){
                if (err) {
                  return res.status(400).json({code:0});
                } else {
                  return res.status(400).json({code:1});
                  } 
              });
            }

            module.exports.addquote = async function(req,res){
              var d=new Date().toISOString().slice(0, 19).replace('T',' ');
              var users={
                   "email":req.body.email,
                   "data":req.body.data,
                   "date":d
                 }
                 console.log(users);
      
                        var sql = "INSERT INTO `quotes`(`email`,`data`,`date`) VALUES ('" + users.email + "','" + users.data + "','" + users.date  +"')";
                        var query = con.query(sql, function(err, result) {  
                          if (err) {
                            return res.status(400).json({code:0});
                          } else {
                            return res.status(400).json({code:1});
                            }
                        });         
                      
            }

            module.exports.getquote = async function(req,res){
      
                 con.query("SELECT *  FROM quotes ORDER BY date DESC LIMIT 5" , function(err , data){
                  if (err) {
                    return res.status(400).json({code:0});
                  } else {
                    return res.status(400).json({code:data});
                    } 
                });
              }
                     
              
              module.exports.testhistory = async function(req,res){
                var users={
                     "email":req.body.email,
                   }
                   console.log(users);
        
                   con.query("SELECT * FROM test WHERE temail = ? " , users.email , function(err , data){
                    if (err) {
                      return res.status(400).json({code:0});
                    } else {
                      return res.status(400).json({code:data});
                      } 
                  });
                }
           
                module.exports.checkpassword=async function(req,res,next){
                  var users={
                    "email":req.body.email,
                    "password":req.body.oldp
                  }
                  con.query("SELECT tpassword FROM teacher WHERE temail = ? " , users.email ,async function(err , data){
                    if (err) {
                      return res.status(400).json({pass:0});
                    } else {
                      console.log(data[0].tpassword);
                      console.log(users.password)
                      let comparision = await bcrypt.compare(users.password, data[0].tpassword)
                      if(comparision)
                      {
                        console.log("password matched");
                        return res.status(400).json({pass:1});
                      }
                      else
                      {
                      console.log("error")
                      return res.status(400).json({pass:0});
                      }
                      } 
                  });
                }

                  module.exports.changepassword=async function(req,res,next){
                    var users={
                      "npass1":req.body.npass1,
                      "npass2":req.body.npass2,
                      "email":req.body.email
                    }
                    if(users.npass1==users.npass2)
                    {
                      console.log("pass matched");
                      const encryptedPassword = await bcrypt.hash(users.npass1, saltRounds)
                      var sql = "UPDATE teacher SET tpassword ='" + encryptedPassword + "' WHERE temail = '"+users.email + "'" ;
                      con.query(sql,function(err , data){
                        if (err) {
                          console.log(err);
                          return res.status(400).json({pass:0});
                        } else {
                          return res.status(400).json({pass:1});
                          } 
                      });
                    }
                    else
                    {
                      return res.status(400).json({pass:2});
                    }
                    console.log(users)                

                  
               }


               module.exports.testdetails = async function(req,res){
                var users={
                     tid:req.body.testid
                   }        
                   con.query("SELECT *  FROM mcq WHERE testid = ? " , users.tid , function(err , data){
                    if (err) {
                      return res.status(400).json({code:0});
                    } else {
                      return res.send(data);
                      } 
                  });
                }

                module.exports.getnotice1 = async function(req,res){
                  con.query("SELECT *  FROM notifications", function(err , data){
                      if (err) {
                        return res.status(400).json({code:0});
                      } else {
                        return res.status(400).json({code:data});
                        } 
                    });
                  }

                  module.exports.checkpassword1=async function(req,res,next){
                    var users={
                      "email":req.body.email,
                      "password":req.body.oldp
                    }
                    con.query("SELECT spassword FROM student WHERE semail = ? " , users.email ,async function(err , data){
                      if (err) {
                        return res.status(400).json({pass:0});
                      } else {
                        let comparision = await bcrypt.compare(users.password, data[0].spassword)
                        if(comparision)
                        {
                          console.log("password matched");
                          return res.status(400).json({pass:1});
                        }
                        else
                        {
                        console.log("error")
                        return res.status(400).json({pass:0});
                        }
                        } 
                    });
                  }

                  module.exports.changepassword1=async function(req,res,next){
                    var users={
                      "npass1":req.body.npass1,
                      "npass2":req.body.npass2,
                      "email":req.body.email
                    }
                    if(users.npass1==users.npass2)
                    {
                      console.log("pass matched");
                      const encryptedPassword = await bcrypt.hash(users.npass1, saltRounds)
                      var sql = "UPDATE student SET spassword ='" + encryptedPassword + "' WHERE semail = '"+users.email + "'" ;
                      con.query(sql,function(err , data){
                        if (err) {
                          console.log(err);
                          return res.status(400).json({pass:0});
                        } else {
                          return res.status(400).json({pass:1});
                          } 
                      });
                    }
                    else
                    {
                      return res.status(400).json({pass:2});
                    }            
                  }

                  module.exports.addtocalender = async function(req,res){
                    var users={
                         "email":req.body.email,
                         "date":req.body.date,
                         "eventname":req.body.event,
                         "eventdesc":req.body.description,
                       }
                       console.log(users);
                              var sql = "INSERT INTO `calender` (`email`, `date`, `eventname`, `description`) VALUES ('" + users.email + "','" + users.date + "','" + users.eventname + "','"+users.eventdesc+"')";
                              var query = con.query(sql, function(err, result) {  
                                if (err) {
                                  console.log(err);
                                  return res.json({code:0});
                                } else {
                                  return res.status(400).json({code:1});
                                  }
                              });                  
                  }

                  module.exports.getcalender = async function(req,res){
                    var users={
                         "email":req.body.email,
                         "date":req.body.date,

                       }
                       console.log(users);
                       con.query("SELECT `sno`,`eventname`, `description` FROM `calender` WHERE `date`='"+users.date+"' AND `email`='"+users.email+"'", function(err , data){
                        if (err) {
                          console.log(err);
                          return res.json({code:0});
                        } else {
                          return res.json({code:data});
                          } 
                      });
                    }

                    module.exports.getcalender1 = async function(req,res){
                      var users={
                           "date":req.body.date,  
                         }
                         console.log(users);
                         con.query("SELECT `sno`,`eventname`, `description` FROM `calender` WHERE `date`='"+users.date+"'", function(err , data){
                          if (err) {
                            console.log(err);
                            return res.json({code:0});
                          } else {
                            return res.json({code:data});
                            } 
                        });
                      }

                    module.exports.getallcalender = async function(req,res){
                      var users={
                        "email":req.body.email,
                      }
                      con.query("SELECT `sno`,`date` FROM `calender` WHERE `email`='"+users.email+"'", function(err , data){
                        if (err) {
                          console.log(err);
                          return res.json({code:0});
                        } else {
                          // console.log(data)
                          return res.json({code:data});
                          } 
                      });
                      }

                      module.exports.updatecalender = async function(req,res){
                        var users={
                             "sno":req.body.sno,
                             "ename":req.body.eventname,
                             "des":req.body.description,
                           }
                           console.log(users);
                           con.query("UPDATE `calender` SET `eventname`='"+users.ename+"',`description`='"+users.des+"' WHERE Where `sno`='"+users.sno+"'", function(err , data){
                            if (err) {
                              console.log(err);
                              return res.json({code:0});
                            } else {
                              return res.send("updated");
                              } 
                          });
                        }


                      module.exports.deletecalender = async function(req,res){
                        var users={
                             "sno":req.body.sno,
                           }
                           console.log(users);
                           con.query("DELETE FROM `calender` Where `sno`='"+users.sno+"'", function(err , data){
                            if (err) {
                              console.log(err);
                              return res.json({code:0});
                            } else {
                              return res.send("deleted");
                              } 
                          });
                        }

                        module.exports.getblog = async function(req,res){
                          con.query("SELECT * FROM blogg", function(err , data){
                              if (err) {
                                console.log(err)
                                return res.status(400).json({code:0});
                              } else {
                                // console.log(code)
                                return res.status(400).json({code:data});
                                } 
                            });
                          }
                          module.exports.viewblog = async function(req,res){
                            con.query("SELECT * FROM blogg WHERE sn = ?",req.body.id, function(err , data){
                                if (err) {
                                  console.log(err)
                                  return res.status(400).json({code:0});
                                } else {
                                  // console.log(code)
                                  return res.status(400).json({code:data});
                                  } 
                              });
                            }
                            module.exports.getcomment = async function(req,res){
                              con.query("SELECT * FROM comment WHERE bogid = ?",req.body.id, function(err , data){
                                  if (err) {
                                    console.log(err)
                                    return res.status(400).json({code:0});
                                  } else {
                                    // console.log(code)
                                    return res.status(400).json({code:data});
                                    } 
                                });
                              }

                              module.exports.addcomment = async function(req,res){
                                var d=new Date().toISOString().slice(0, 19).replace('T',' ');
                                var users={
                                     "email":req.body.email,
                                     "data":req.body.data,
                                     "id":req.body.id,
                                     "date":d
                                   }
                                          var sql = "INSERT INTO `comment` (`bogid`, `comments`, `date`, `email`) VALUES ('" + users.id + "','" + users.data + "','" + users.date + "','"+users.email+"')";
                                          var query = con.query(sql, function(err, result) {  
                                            if (err) {
                                              console.log(err);
                                              return res.json({code:0});
                                            } else {
                                              return res.status(400).json({code:1});
                                              }
                                          });                  
                              }
                              module.exports.updatelike = async function(req,res){
                                var users={
                                     "id":req.body.id,
                                     "count":req.body.count
                                   }
                                   console.log(users)
                                   var sql = "UPDATE blogg SET count ='" + users.count + "' WHERE sn = '"+users.id + "'" ;
                                    con.query(sql,function(err , data){
                                     if (err) {
                                      console.log(err);
                                       return res.status(400).json({code:0});
                                    } else {
                                      console.log("added")
                                    return res.status(400).json({code:1});
                                   } 
                                   });
                                   }