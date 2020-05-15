var express = require('express');
const router=require('express').Router();
    var app = express()
    var con= require('./../dbconnection');
    module.exports.handleFile = async function(req,res,next){
        var temp=req.body;
        console.log(temp);
        temp.map((t)=>{
            var mcq={
                "sno":t.qno,
                "question":t.ques,
                "option1":t.choices[0],
                "option2":t.choices[1],
                "option3":t.choices[2],
                "option4":t.choices[3],
                "answer":t.ans
              }
              
        })
    }
     // module.exports=router;