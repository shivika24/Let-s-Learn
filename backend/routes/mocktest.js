var con= require('./../dbconnection');

module.exports.getmocktest = async function(req,res){
       con.query("SELECT *  FROM mtest", function(err , data){
        if (err) {
          return res.status(400).json({code:0});
        } else {
          return res.status(400).json({code:data});
          } 
      });
    }

    module.exports.gettest = async function(req,res){
        var users={
             "testid":req.body.testid,
           }
           con.query("SELECT *  FROM mocktest WHERE testid = ? " , users.testid , function(err , data){
            if (err) {
              return res.status(400).json({code:0});
            } else {
              return res.status(400).json({code:data});
              } 
          });
        }

    
        