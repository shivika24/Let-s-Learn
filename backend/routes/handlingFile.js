var express = require('express');
const router=require('express').Router();
    var app = express()
    var con= require('./../dbconnection');
    var testId;
    module.exports.checkTestId=async function(req,res,next){
        console.log(req.body);
        con.query("SELECT COUNT(*) AS cnt from mcq WHERE testid = ?",req.body.testid,function(err,data){
            if(err)
            console.log(err);
            else
            {
                if(data[0].cnt > 0)  
                return res.status(400).json({resType:0});
                else
                {
                    testId=req.body.testid;
                    con.query("SELECT tid FROM teacher WHERE temail=?",req.query.temail,function(err,data){
                        if(err)
                        console.log(err);
                        else{
                    var sql = "INSERT INTO `test`(`temail`,`tid`,`testid`) VALUES('"+ req.query.temail+"','"+data[0].tid +"','"+ testId+"') ";
                    con.query(sql,function(err,result){
                        if(err)
                        console.log(err);
                        console.log('test table updated');
                    })
                }
                })
                    return res.json({resType:1});
                }
            }
        })
    }
    module.exports.handleFile = async function(req,res,next){
        var temp=req.body;
      //  console.log(testId)
      //  console.log(temp);
      
        temp.map((t)=>{
            var obj="";
       var q=t.ques.split("?");
       console.log(q);
        for(var l=0;l<q.length-1;l++)
          obj=obj+q[l]+" ";
           obj=obj+q[q.length-1]+"?";
              var sql = "INSERT INTO `mcq`(`sno`,`testid`,`question`,`option1`, `option2`, `option3`,`option4`,`answer`) VALUES ('" + t.qno + "','" + testId + "','" + obj + "','" + t.choices[0] + "','" + t.choices[1] + "','" +t.choices[2] +"','" +t.choices[3] +"','"+t.ans +"')";
              con.query(sql,function(err,result){
                  if(err)
                  console.log("**"+err+"**")
                 // else res.json('');
              })
        })
        res.json('Uploaded');
    }
     // module.exports=router;