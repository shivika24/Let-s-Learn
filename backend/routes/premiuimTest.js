var con= require('./../dbconnection');

module.exports.submittedQues=async function(req,res,next)
{
    var str=[];
    var arr=req.body.res;
    var s=arr.join("*");
    console.log(s);
    con.query("SELECT index1 FROM pmcq WHERE testid = ? " , req.body.testid ,function(err , data){
       if (err) {
         return res.status(400).json({pass:0});
       } else {
           for(var i=0;i<data.length;i++)
           {
               str.push(parseInt(data[i].index1))
           }
         var s1=str.join("*");
         var a1=s.split("*");
         var a2=s1.split("*");
         var count=0;
         console.log(a1)
         console.log(a2)
         if(a1.length==a2.length)
         {
             for(var j=0;j<a1.length;j++)
             {
                 if(a1[j]==a2[j])
                 count++;
             }
             console.log("marks"+count);
               //   var sql = "INSERT INTO `result`(`semail`,`testid`,`answers`,`marks`,`year`,`rollno`) VALUES ('" + req.body.semail + "','" + req.body.testid + "','" +s + "','" + count  + "','" + year  + "','" + roll  +"')";
                   var sql="UPDATE premiumresult SET marks=? WHERE semail=? AND testid=?";
                 var query = con.query(sql,[count,req.body.semail,req.body.testid], function(err, result) {  
                   if (err) {
                   console.log(err)
                   } 
                   else
                   {
                       console.log("inserted");
                   }})
                 }
            
             
            // console.log(year)

         }

       } )
   }
module.exports.updateMcqSub=async function(req,res,next)
    {
        var email=req.query.semail;
        var testid=req.query.testid;
        console.log(email+" "+testid+" "+req.body);
        var arr=req.body.join("*");
        var sql="UPDATE premiumresult SET answers=? WHERE semail=? AND testid=?";
        con.query(sql,[arr,email,testid],function(err,data){
           if(err)
           console.log(err);
           else
           {
               console.log("RESULT ARRAY UPDATED!!");
           }
        })
    }
module.exports.initialRes= async function(req,res)
      {
          var email=req.body.semail;
          var testid=req.body.testid;
          var len=req.body.len;
          console.log("e:"+email+" tid:"+testid);
          var sql1="SELECT COUNT(answers) AS cnt FROM premiumresult WHERE semail ='" + email + "' AND testid = '"+testid + "'" ;
          var sql2="SELECT answers FROM premiumresult WHERE semail ='" + email + "' AND testid = '"+testid + "'" ;
          con.query(sql1,function(err,data){
              if(err)
              console.log(err);
              else
              {
                  if(data[0].cnt>0)
                  {
                      con.query(sql2,function(err,data){
                          if(err)
                          console.log(err);
                          else 
                          {
                            //   if(data[0].marks=="")
                            //   console.log("marks:"+data[0].marks);
                              var ans=data[0].answers.split("*");
                              res.send({resType:0,arr:ans});
                          }
                      })
                  
                  }
                  else
                  {
                      var arr=[]
                      for(var i=0;i<len;i++)
                       arr.push(-1);
                       arr=arr.join("*");
                       var sql="INSERT INTO `premiumresult`(`semail`,`testid`,`answers`) VALUES ('" + email + "','" + testid + "','" +arr + "')";
                     con.query(sql,function(err,data){
                         if(err)
                         console.log(err);
                         res.send({resType:1})
                     })
                  } 
              }
          })
      }
      module.exports.viewPremAnalysis = async function(req,res){
        var users={
          "testid":req.body.testid,
        }
        con.query("SELECT `question`, `index1` FROM `pmcq` WHERE  `testid`='"+users.testid+"'", function(err , data){
          if (err) {
            console.log(err);
            return res.json({data:null});
          } else {
            console.log(data)
            return res.json({data:data});
            } 
        });
      }
      module.exports.studentPremParticular = async function(req,res){
        var users={
          "email":req.body.email,
          "Testid":req.body.testid,
      
        }
        console.log(users.Testid)
        con.query("SELECT `answers`,`marks` FROM `premiumresult` WHERE `semail`='"+users.email+"' And `testid`='"+users.Testid+"'", function(err , data){
          if (err) {
            console.log(err);
            return res.json({data:null});
          } else {
            console.log(data);
            return res.json({data:data});
            } 
        });
      }