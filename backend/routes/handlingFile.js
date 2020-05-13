var express = require('express');
const router=require('express').Router();
    var app = express()
    var con= require('./../dbconnection');
  //  var config=require('./config.js');
    //multer
    // var multer  = require('multer');
    // var upload = multer();
    // app.post('/handleFile',upload.single('uploadCsv'), function(req, res, next) {
    //       // req.file is the `uploadCsv` file 
    //       // req.body will hold the text fields, if there were any 
    //       console.log(req.file);
    //       // the buffer here containes your file data in a byte array 
    //       var csv=req.file.buffer.toString('utf8');
    //  });
    module.exports.handleFile = async function(req,res,next){
        console.log(req.body);
    }
     // module.exports=router;