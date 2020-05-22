var express = require('express');
const router=require('express').Router();
    var app = express()
    var con= require('./../dbconnection');
    var testId;
    var testName="";
    var teachId="";
    module.exports.checkTestId=async function(req,res,next){
        con.query("SELECT COUNT(*) AS cnt from test WHERE testid = ?",req.body.testid,function(err,data){
            
            if(err)
            console.log(err);
            else
            {
                if(data[0].cnt > 0)  
                return res.json({resType:0});
                else
                {
                    testId=req.body.testid;
                    testName=req.body.testname;
                    return res.json({resType:1});
                }
            }
        })
    }
    module.exports.handleFile = async function(req,res,next){
        var temp=req.body;
       console.log(testId)
      //  console.log(temp);
      var link="";
        console.log(temp);
        temp.map((t,index)=>{
         
            var sql = "INSERT INTO `mcq`(`sno`,`testid`,`question`,`option1`, `option2`, `option3`,`option4`,`answer`) VALUES ('" + (parseInt(index)+1) + "','" + testId + "','" + t[0] + "','" + t[1] + "','" + t[2] + "','" +t[3] +"','" +t[4] +"','"+t[5] +"')";
            con.query(sql,function(err,result)
            {
            if(err)
               {
                console.log("**"+err+"**");
               }
            else{
                    console.log(result);
                }
            }
            )
        })
            
    //         var obj="";
    //    var q=t.ques.split("?");
    //    console.log(q);
    //     for(var l=0;l<q.length-1;l++)
    //       obj=obj+q[l]+" ";
    //        obj=obj+q[q.length-1]+"?";
    //           var sql = "INSERT INTO `mcq`(`sno`,`testid`,`question`,`option1`, `option2`, `option3`,`option4`,`answer`) VALUES ('" + t.qno + "','" + testId + "','" + obj + "','" + t.choices[0] + "','" + t.choices[1] + "','" +t.choices[2] +"','" +t.choices[3] +"','"+t.ans +"')";
    //           con.query(sql,function(err,result){
    //               if(err)
    //               console.log("**"+err+"**")
    //              // else res.json('');
    //           })
        var d=new Date().toISOString().slice(0, 19).replace('T',' ');
        
                 con.query("SELECT tid FROM teacher WHERE temail=?",req.query.temail,function(err,data){
                    if(err)
                    console.log(err);
                    else{
                        teachId=data[0].tid;
                        link='http://localhost:3000/testlogin?name='+testName+'&id='+teachId+'&code='+testId;
                var sql = "INSERT INTO `test`(`temail`,`tid`,`testid`,`testName`,`Date`,`url`) VALUES('"+ req.query.temail+"','"+data[0].tid +"','"+ testId+"','"+ testName +"','"+ d+"','"+link+"') ";
                con.query(sql,function(err,result){
                    if(err)
                    console.log(err);
                    console.log('test table updated');
                    console.log(link)
                    res.send({ln:link});
                })
            }
            })
         console.log("*"+link+"*")  
          
        
    }
    module.exports.updateMcqSub=async function(req,res,next)
    {
        var email=req.query.semail;
        var testid=req.query.testid;
        console.log(email+" "+testid+" "+req.body);
        var arr=req.body.join("*");
        var sql="UPDATE result SET answers=? WHERE semail=? AND testid=?";
        con.query(sql,[arr,email,testid],function(err,data){
           if(err)
           console.log(err);
           else
           {
               console.log("RESULT ARRAY UPDATED!!");
           }
        })
    }
     module.exports.submittedQues=async function(req,res,next)
     {
         var str=[];
         var arr=req.body.res;
         var s=arr.join("*");
         console.log(s);
         con.query("SELECT answer FROM mcq WHERE testid = ? " , req.body.testid ,function(err , data){
            if (err) {
              return res.status(400).json({pass:0});
            } else {
                for(var i=0;i<data.length;i++)
                {
                    str.push(parseInt(data[i].answer))
                }
              var s1=str.join("*");
              var a1=s.split("*");
              var a2=s1.split("*");
              var count=0;
              console.log(a1)
              console.log(a2)
              if(a1.length==a2.length)
              {
                  for(var j=0;j<a1.length;j++)
                  {
                      if(a1[j]==a2[j])
                      count++;
                  }
                  console.log("marks"+count);
                  var roll='',year;
                  var sql1="SELECT srollno,syear FROM student WHERE semail='"+req.body.semail+"'";
                  var query1 = con.query(sql1, function(err, resultss) {  
                      if(err)
                      console.log(err);
                      else
                      {
                      roll=resultss[0].srollno;
                      year=resultss[0].syear;
                      console.log(year)
                      console.log(roll)
                    //   var sql = "INSERT INTO `result`(`semail`,`testid`,`answers`,`marks`,`year`,`rollno`) VALUES ('" + req.body.semail + "','" + req.body.testid + "','" +s + "','" + count  + "','" + year  + "','" + roll  +"')";
                        var sql="UPDATE result SET marks=? , year=? ,rollno=? WHERE semail=? AND testid=?";
                      var query = con.query(sql,[count,year,roll,req.body.semail,req.body.testid], function(err, result) {  
                        if (err) {
                        console.log(err)
                        } 
                        else
                        {
                            console.log("inserted");
                        }})
                      }
                  })
                  
                 // console.log(year)

              }

            } 
        })
        
     }

     module.exports.checkt = async function(req,res){
          var users={
             "email":req.body.email,
             "testid":req.body.testid
           }
           console.log(users)
           var sql = "SELECT COUNT(*) AS cnt FROM result WHERE semail ='" + users.email + "' AND testid = '"+users.testid + "'" ;
           con.query(sql,function(err , data){
            //    if(err)
            //    console.log(err)
            //    else
            //    console.log(data[0].cnt)
            if (data[0].cnt>=1) {
                var sql1="SELECT marks FROM result WHERE semail ='" + users.email + "' AND testid = '"+users.testid + "'" ;
                con.query(sql1,function(err,data)
                {
                    if(err)
                    console.log(err)
                    else if(data[0].marks=="")
                    return res.status(400).json({pass:1});
                    else
                    {
                        console.log("already test");
                        return res.status(400).json({pass:0});
                    }
                })
              
            } else {
              return res.status(400).json({pass:1});
              } 
          });
      }
      module.exports.initialRes= async function(req,res)
      {
          var email=req.body.semail;
          var testid=req.body.testid;
          var len=req.body.len;
          console.log("e:"+email+" tid:"+testid);
          var sql1="SELECT COUNT(answers) AS cnt FROM result WHERE semail ='" + email + "' AND testid = '"+testid + "'" ;
          var sql2="SELECT answers FROM result WHERE semail ='" + email + "' AND testid = '"+testid + "'" ;
          con.query(sql1,function(err,data){
              if(err)
              console.log(err);
              else
              {
                  if(data[0].cnt>0)
                  {
                      con.query(sql2,function(err,data){
                          if(err)
                          console.log(err);
                          else 
                          {
                            //   if(data[0].marks=="")
                            //   console.log("marks:"+data[0].marks);
                              var ans=data[0].answers.split("*");
                              res.send({resType:0,arr:ans});
                          }
                      })
                  
                  }
                  else
                  {
                      var arr=[]
                      for(var i=0;i<len;i++)
                       arr.push(-1);
                       arr=arr.join("*");
                       var sql="INSERT INTO `result`(`semail`,`testid`,`answers`) VALUES ('" + email + "','" + testid + "','" +arr + "')";
                     con.query(sql,function(err,data){
                         if(err)
                         console.log(err);
                         res.send({resType:1})
                     })
                  } 
              }
          })
      }