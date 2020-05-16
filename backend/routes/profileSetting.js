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