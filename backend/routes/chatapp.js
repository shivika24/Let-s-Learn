var con= require('./../dbconnection');
module.exports.search = async function(req,res){
  console.log(req.body.type)
  if(req.body.email=='' || req.body.email==null)
     {
      var sql="SELECT * FROM chat WHERE sender = '"+req.body.e1+"' GROUP BY reciever";
      con.query(sql,function(err , data){
        if (err) 
        {
          return res.status(400).json({code:0});
        } 
       else 
       {
       return res.status(400).json({code:data});
      } 
      });
     }
  else if(req.body.type=="student")
   {
    var sql="SELECT * FROM teacher WHERE temail LIKE '"+req.body.email+"%'";
    con.query(sql,function(err , data){
        if (err) {
          return res.status(400).json({code:0});
       } else {
       return res.status(400).json({code:data});
      } 
      });
   }
   else
   {
    var sql="SELECT * FROM student WHERE semail LIKE '"+req.body.email+"%'";
    con.query(sql,function(err , data){
        if (err) {
          return res.status(400).json({code:0});
       } else {
       return res.status(400).json({code:data});
      } 
      });
   }
    }

    module.exports.addmsg = async function(req,res){
        var d=new Date().toISOString().slice(0, 19).replace('T',' ');
        var users={
             "sender":req.body.sender,
             "reciever":req.body.reciever,
             "message":req.body.message,
             "date":d
           }
                  var sql = "INSERT INTO `chat` (`sender`, `reciever`, `message`, `date`) VALUES ('" + users.sender + "','" + users.reciever + "','" + users.message + "','"+users.date+"')";
                  var query = con.query(sql, function(err, result) {  
                    if (err) {
                      console.log(err);
                      return res.json({code:0});
                    } else {
                      return res.status(400).json({code:1});
                      }
                  });                  
      }
      module.exports.sendermsg = async function(req,res){
        var users={
             sender:req.body.sender,
             reciever:req.body.reciever
           }        
           var sql = "SELECT * FROM  chat WHERE sender ='"+users.sender+"' AND reciever ='"+users.reciever+"' OR sender ='"+users.reciever+"' AND reciever ='"+users.sender+"'ORDER BY date asc";
           var query = con.query(sql, function(err, result) {  
            if (err) {
              console.log(err);
              return res.json({code:0});
            } else {
              return res.json({code:result});
              }
          });     
        }
       