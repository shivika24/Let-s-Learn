var express = require('express');
const router=require('express').Router();
    var app = express()
    const csv = require('csv-parser');
    const fs = require('fs');
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
    app.post('/handleFile',function(req,res,next){
        fs.createReadStream(req.body)
      .pipe(csv())
      .on('data', (data) => this.state.testFile.push(data))
      .on('end', () => {
        console.log(this.state.testFile);
      })
    })
      module.exports=router;