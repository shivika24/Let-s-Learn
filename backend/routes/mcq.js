var express = require('express');
var con= require('./../dbconnection');
//var result=[]
module.exports.mcq= async function(req,res)
{
    con.query("SELECT * FROM mcq",function(err,result,fields){
        if(err)
        console.log(err);
        console.log(JSON.stringify(result));
        res.send(result)
    //    else{
    //     if(data.length){
    //         for(var i = 0; i<data.length; i++ ){     
    //                         result.push(data[i]);
    //             }
    //          }
    //        console.log("Inside npm");
    //        console.log(result);
    //        return result;
    //    }
    })
}