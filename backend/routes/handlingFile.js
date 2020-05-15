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
              var sql = "INSERT INTO `mcq`(`sno`,`testid`,`question`,`option1`, `option2`, `option3`,`option4`,`answer`) VALUES ('" + t.qno + "','" + testId + "','" + t.ques + "','" + t.choices[0] + "','" + t.choices[1] + "','" +t.choices[2] +"','" +t.choices[3] +"','"+t.ans +"')";
              con.query(sql,function(err,result){
                  if(err)
                  console.log("**"+err+"**")
                 // else res.json('');
              })
        })
        res.json('Uploaded');
    }
     // module.exports=router;