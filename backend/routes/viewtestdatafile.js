var express = require('express');
var con= require('./../dbconnection');

module.exports.viewtestdata = async function(req,res){
    var users={
      "testid":req.body.testid,
    }
    con.query("SELECT * FROM `result` WHERE `testid`='"+users.testid+"'", function(err , data){
      if (err) {
        console.log(err);
        return res.json({code:0});
      } else {
        // console.log(data)
        return res.json({code:data});
        } 
    });
}