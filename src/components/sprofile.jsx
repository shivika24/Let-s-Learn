import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Sprofile extends Component
{
    constructor()
    {
        super();
        let u="Name";
        let email="email"
      try{
        u =  JSON.parse(localStorage.getItem("jwt")).user.name;
        email=JSON.parse(localStorage.getItem("jwt")).user.id;
      }catch(e){
          u=""
      }
        this.state={
            username:u,
            eid:email,
            phone:'',
            flag1:false,
            skills:[],
            ten:"",
            twel:"",
            grad:"",
            pic:""
        }
    }
    pass=e=>{
         var obj={
          email:JSON.parse(localStorage.getItem("jwt")).user.id,    
          oldp:e,
        };
         fetch("http://localhost:8082/checkpass1",{
          method:"POST",
          headers:{
           Accept: "application/json",
             "Content-Type":"application/json",
             },
          body:JSON.stringify(obj)
       })
       .then(res => res.json())
          .then(res => {
            if(res.pass === 1)
            {
                console.log("matched")
            this.setState({flag1:true})
            }
        else 
        {
         alert("Incorrect Password Entered")
        }
       });  
       }
       changepass=()=>{
        var e=document.getElementById("npass01").value;
        var f=document.getElementById("npass02").value;
        console.log(e);
        console.log(f)
        var obj={
        email:JSON.parse(localStorage.getItem("jwt")).user.id,  
        npass1:e,
        npass2:f,
       };
        fetch("http://localhost:8082/changepass1",{
         method:"POST",
         headers:{
          Accept: "application/json",
            "Content-Type":"application/json",
            },
         body:JSON.stringify(obj)
      })
      .then(res => res.json())
         .then(res => {
           if(res.pass === 1)
           {
            alert("Password Changed");
            window.location="http://localhost:3000/studentDashboard";        
           }
           else if(res.pass===2)
           {
               alert("Password do not match");
               window.location="http://localhost:3000/studentDashboard";    
           }
       else 
       {
        alert("Password Not Entered")
       }
      });  
       }
       arrayBufferToBase64=(buffer)=> {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
      //  console.log(window.btoa(binary));
        return window.btoa(binary);
    }
    componentDidMount()
    {
        fetch(` http://localhost:8082/phone1?tId=${this.state.eid}`)
        .then(res => {return res.json()})
        .then(res => {
              console.log(JSON.stringify(res));
             this.setState({phone:res.spno});
                      }
            )
            fetch(`http://localhost:8082/getskill?semail=${this.state.eid}`)
            .then(res => {return res.json()})
            .then(res => {
                  console.log(JSON.stringify(res));
                 this.setState({skills:res});
                          }
                ) 
                fetch(`http://localhost:8082/getedu?semail=${this.state.eid}`)
                .then(res => {return res.json()})
                .then(res => {
                      console.log(JSON.stringify(res));
                     this.setState({ten:res.ten,twel:res.twel,grad:res.grad});
                              }
                    ) 
                    fetch(`http://localhost:8082/getphoto?semail=${this.state.eid}`)
                    .then(res => {return res.json()})
                    .then(data => {
                        var base64Flag = 'data:image/jpeg;base64,';
                        var imageStr =
                            this.arrayBufferToBase64(data.buff.data);
                    this.setState({pic:(base64Flag + imageStr)});
                        })  
    }
    saveSettings=(e)=>
    {
        e.preventDefault();
        var obj={
            name:document.getElementById("uname").value,
           email:document.getElementById("uemail").value,
            ph_num:document.getElementById("uph_no").value
        }
        fetch(' http://localhost:8082/savesetting1',{
         method:"PUT",
         headers:{
            "Content-Type":"application/json",
            },
         body:JSON.stringify(obj)
      })
      .then(res => {
         if(res.ok){return res.json();}
      })
      .then(res=>{
          var n=JSON.parse(localStorage.getItem("jwt")).user.name;
          var i=JSON.parse(localStorage.getItem("jwt")).user.id;
          var tok=JSON.parse(localStorage.getItem("jwt")).token;
          var ljwt={
              token:tok,
              user:{id:i,name:obj.name}
            };
        localStorage.removeItem("jwt");
        localStorage.setItem("jwt",JSON.stringify(ljwt));
        this.setState({username:JSON.parse(localStorage.getItem("jwt")).user.name,phone:obj.ph_num});
        console.log(this.state.username+" "+this.state.phone);
          alert(JSON.stringify(res))
      })
      //.catch(res=>console.log(res))
      
      
    }
    render(){
        return(
            <div id="wrapper">
                <div class="container-fluid">
                <center><h3 class="mb-4" style={{color:"#206188",fontWeight:"800"}}>PROFILE</h3></center>
                <div class="row mb-3">
                    <div class="col-lg-4">
                        <div class="card mb-3">
                            <div class="card-body text-center shadow"><img class="rounded-circle mb-3 mt-4" src={this.state.pic} width="160" height="160"/>
                                <div class="mb-3"><p  className="h6 text text-primary"id="uname" name="username">{this.state.username}</p></div>
                            </div>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="text-primary font-weight-bold m-0">Skills</h6>
                            </div>
                            <div class="card-body">
                                {this.state.skills.length===0?<p className="h5 text-info">Add skills from setting</p>:<div>
                                {this.state.skills.map((skill)=>{
                               return <div><h4 class="small font-weight-bold">{skill.name}<span class="float-right">{skill.percentage}</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: skill.percentage+"%"}}><span class="sr-only">40%</span></div>
                                </div></div>
                                })}
                                <p className="h6 text-info">**You can add more skills from setting**</p>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="row mb-3 d-none">
                            <div class="col">
                                <div class="card text-white bg-primary shadow">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col">
                                                <p class="m-0">Peformance</p>
                                                <p class="m-0"><strong>65.2%</strong></p>
                                            </div>
                                            <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
                                        </div>
                                        <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card text-white bg-success shadow">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col">
                                                <p class="m-0">Peformance</p>
                                                <p class="m-0"><strong>65.2%</strong></p>
                                            </div>
                                            <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
                                        </div>
                                        <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="card shadow mb-3">
                                    <div class="card-header py-3">
                                        <p class="text-primary m-0 font-weight-bold">Your Profile</p>
                                    </div>
                                    <div class="card-body">
                                        <form onSubmit={this.saveSettings}>
                                            <div class="form-row">
                                                <div class="col">
                                                    <div class="form-group"><label for="username"><strong>Name:</strong></label><p  className="h4 text text-primary"id="uname" name="username">{this.state.username}</p></div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group"><label for="email"><strong>Email Address:</strong></label><p className="text text-primary"   id="uemail" name="email">{this.state.eid}</p></div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="col">
                                                    <div class="form-group"><label for="first_name"><strong>Mobile Number</strong></label><p classNmae="text text-gray" id="uph_no" name="phone_num">{this.state.phone}</p></div>
                                                </div>
                                                {/* <div class="col">
                                                    <div class="form-group"><label for="last_name"><strong>Last Name</strong></label><input class="form-control" type="text" placeholder="Doe" name="last_name"/></div>
                                                </div> */}
                                            </div>
                                            {/* <div class="form-group"><button class="btn btn-primary btn-sm" type="submit">Save Settings</button></div> */}
                                        </form>
                                    </div>
                                </div>
                                <div class="card shadow">
                                    <div class="card-header py-3">
                                        <p class="text-primary m-0 font-weight-bold">Education</p>
                                    </div>
                                    <div class="card-body">
                                        <form >
                                            <div class="form-group"><label for="address"><strong>10th</strong></label><p className="h5 text-gray-800">{this.state.ten}</p></div>
                                            <div class="form-row">
                                                <div class="col">
                                                    <div class="form-group"><label for="city"><strong>12th</strong></label><p className="h5 text-gray-800">{this.state.twel}</p></div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group"><label for="country"><strong>Graduation</strong></label><p className="h5 text-gray-800">{this.state.grad}</p></div>
                                                </div>
                                            </div>
                                            {/* <div class="form-group"><button class="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button></div> */}
                                        </form>
                                    </div>
                                </div>
                                <center><div class="mb-3"><Link class="btn btn-primary btn-sm" to="/ssetting">Edit Profile</Link></div></center>
                            </div>
    
                        </div>
                    </div>
                </div>               
            </div>

            <div class="modal fade " id="changeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-info">
                        <h5 class="modal-title text-gray-800" id="exampleModalLabel">CHANGE PASSWORD</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      {this.state.flag1==false?
                        (<div class="modal-body">
                          
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" id="pass01" placeholder="Enter Old Password" required/>
                          </div>
                        </div>):
                        (<div class="modal-body">
                          <div class="input-group mb-3">
                          <input type="password" class="form-control" id="npass01" placeholder="Enter New Password" required/>
                          </div>
                          <div class="input-group mb-3">
                          <input type="password" class="form-control" id="npass02" placeholder="ReEnter New Password" required/>
                          </div>
                          </div>
                        )}
                        {this.state.flag1==false?
                        <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <button class="btn btn-primary" onClick={()=>this.pass(document.getElementById("pass01").value)}>Next</button>
                        </div>:
                          <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <button class="btn btn-primary" onClick={()=>this.changepass(document.getElementById("npass01").value,document.getElementById("npass02").value)}>CHANGE</button>
                       </div>
                        }
                    </div>
                  </div>
                </div>            
            </div>
        )
    }
}