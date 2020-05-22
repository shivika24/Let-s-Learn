var con= require('./../dbconnection');

module.exports.phone= async function(req,res)
{
    console.log("**"+req.query.tId+"**");
    con.query("SELECT tpno FROM teacher WHERE temail = ?",req.query.tId,function(err,data){
        console.log(data[0]);
        if(err)
        console.log(err);
        else res.json(data[0]);
    })
}
module.exports.settings= async function(req,res){
    console.log(req.body.name+" "+req.body.ph_num+" "+req.body.email);
    var sql="UPDATE teacher SET tname =? , tpno =?  WHERE temail = ?";
    con.query(sql,[req.body.name,req.body.ph_num,req.body.email],function(err,data){
       
        if(err)
        throw err;
        else
        {
            console.log('updated');
            res.json('profile updated');
        }
    })
}

module.exports.phone1= async function(req,res)
{
    console.log("**"+req.query.tId+"**");
    con.query("SELECT spno FROM student WHERE semail = ?",req.query.tId,function(err,data){
        console.log(data[0]);
        if(err)
        console.log(err);
        else res.json(data[0]);
    })
}
module.exports.settings1= async function(req,res){
    console.log(req.body.name+" "+req.body.ph_num+" "+req.body.email);
    var sql="UPDATE student SET sname =? , spno =?  WHERE semail = ?";
    con.query(sql,[req.body.name,req.body.ph_num,req.body.email],function(err,data){
       
        if(err)
        throw err;
        else
        {
            console.log('updated');
            res.json('profile updated');
        }
    })
}
module.exports.setskill=function(req,res)
{
    var email=req.query.semail;
    var arr=[];
    con.query("SELECT Skills FROM student WHERE semail=?",email,function(err,data)
    {
        if(err)
        console.log(err);
        else
        {
            if(data=="")
            arr.push(req.body.skill);
            else
            {
                arr=data[0].Skills.split("*");
                arr.push(req.body.skill);
                arr=arr.join("*");
            }
            var sql="UPDATE student SET Skills=? WHERE semail=?";
            con.query(sql,[arr,email],function(err,result){
                if(err)
                console.log(err);
                else 
                {
                    con.query("SELECT Skills from student WHERE semail=?",email,function(err,result)
                    {
                        if(err)
                        console.log(err)
                        else 
                        {
                            arr=result[0].Skills;
                            arr=arr.split("*");
                            res.send(arr);
                        }
                    })
                }
            })
        }
    })
}
module.exports.getSkills=function(req,res)
{
  //  console.log("to get skill");
    con.query("SELECT Skills FROM student WHERE semail=?",req.query.semail,function(err,data)
    {
        //console.log(data[0].Skills)
        if(err)
        console.log(err);
        else 
        {
            var arr=data[0].Skills.split("*");
            res.send(arr);
        }
    })
}
module.exports.getEdu=function(req,res)
{
    con.query("SELECT tenth,twelth,graduation FROM student WHERE semail=?",req.query.semail,function(err,data)
    {
        if(err)
        console.log(err);
        else
        {
            res.send({ten:data[0].tenth,twel:data[0].twelth,grad:data[0].graduation});
        }
    })
}
module.exports.saveEdu=function(req,res)
{
    console.log(req.body);
    var sql="UPDATE student SET tenth =? , twelth =? ,graduation = ? WHERE semail=?";
    con.query(sql,[req.body.tenth,req.body.twelth,req.body.gradu,req.query.semail],function(err,data){
       
        if(err)
        throw err;
        else
        {
            console.log('updated');
            res.json('edu updated');
        }
    })
}