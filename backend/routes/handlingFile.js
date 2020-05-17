var express = require('express');
const router=require('express').Router();
    var app = express()
    var con= require('./../dbconnection');
    var testId;
    var testName="";
    var teachId="";
    module.exports.checkTestId=async function(req,res,next){
        console.log(req.body);
        con.query("SELECT COUNT(*) AS cnt from test WHERE testid = ?",req.body.testid,function(err,data){
            if(err)
            console.log(err);
            else
            {
                if(data[0].cnt > 0)  
                return res.status(400).json({resType:0});
                else
                {
                    con.query("SELECT tid FROM teacher WHERE temail=?",req.query.temail,function(err,data){
                       teachId=data[0].tid;
                    })
                    testId=req.body.testid;
                    testName=req.body.testname;
                    return res.json({code:teachId,resType:1});
                }
            }
        })
    }
    module.exports.handleFile = async function(req,res,next){
        var temp=req.body;
      //  console.log(testId)
      //  console.log(temp);
      var link="";
        temp.map((t)=>{
            link=t.link;
    //         var obj="";
    //    var q=t.ques.split("?");
    //    console.log(q);
    //     for(var l=0;l<q.length-1;l++)
    //       obj=obj+q[l]+" ";
    //        obj=obj+q[q.length-1]+"?";
              var sql = "INSERT INTO `mcq`(`sno`,`testid`,`question`,`option1`, `option2`, `option3`,`option4`,`answer`) VALUES ('" + t.qno + "','" + testId + "','" + t.ques + "','" + t.choices[0] + "','" + t.choices[1] + "','" +t.choices[2] +"','" +t.choices[3] +"','"+t.ans +"')";
              con.query(sql,function(err,result){
                  if(err)
                  console.log("**"+err+"**")
                 // else res.json('');
                 
              })
        })
        console.log(link);
        var d=new Date().toISOString().slice(0, 19).replace('T',' ');
                 con.query("SELECT tid FROM teacher WHERE temail=?",req.query.temail,function(err,data){
                    if(err)
                    console.log(err);
                    else{
                var sql = "INSERT INTO `test`(`temail`,`tid`,`testid`,`testName`,`Date`,`url`) VALUES('"+ req.query.temail+"','"+data[0].tid +"','"+ testId+"','"+ testName +"','"+ d+"','"+link+"') ";
                con.query(sql,function(err,result){
                    if(err)
                    console.log(err);
                    console.log('test table updated');
                })
            }
            })
        res.json('Uploaded');
    }
     // module.exports=router;
    //  module.exports.saveLink=async function(req,res,next)
    // {
    //     console.log(req.body.link+" "+req.query.testid);
    //     var sql="UPDATE test set url = ? WHERE testid = ?";
    //     con.query(sql,[req.body.link,req.query.testid],function(err,data){
    //         if(err)
    //         console.log(err);
    //         else res.send(req.body.link);
    //     })
    // }