import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Profile extends Component
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
            experience:[],
            pic:""
        }
    }
    pass=e=>{
         var obj={
          email:JSON.parse(localStorage.getItem("jwt")).user.id,    
          oldp:e,
        };
         fetch("http://localhost:8082/checkpass",{
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
        fetch("http://localhost:8082/changepass",{
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
            window.location="http://localhost:3000/teacherDashboard";        
           }
           else if(res.pass===2)
           {
               alert("Password do not match");
               window.location="http://localhost:3000/teacherDashboard";    
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
        fetch(` http://localhost:8082/phone?tId=${this.state.eid}`)
        .then(res => {return res.json()})
        .then(res => {
              console.log(JSON.stringify(res));
             this.setState({phone:res.tpno});
                      }
            )
            fetch(`http://localhost:8082/getexp?temail=${this.state.eid}`)
            .then(res => {return res.json()})
            .then(res => {
                  console.log(JSON.stringify(res));
                 this.setState({experience:res});
                          }
                ) 
                fetch(`http://localhost:8082/gettphoto?temail=${this.state.eid}`)
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
        fetch(' http://localhost:8082/savesetting',{
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
                <h3 class="text-dark mb-4">Profile</h3>
                <div class="row mb-3">
                    <div class="col-lg-4">
                        <div class="card mb-3">
                            <div class="card-body text-center shadow"><img class="rounded-circle mb-3 mt-4" src={this.state.pic} width="160" height="160"/>
                                <div class="mb-3"><p  className="h6 text text-primary"id="uname" name="username">{this.state.username}</p></div>
                            </div>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="text-primary font-weight-bold m-0">Experience</h6>
                            </div>
                            <div class="card-body">
                            {this.state.experience.length===0?<p className="h5 text-info">Add experience from setting</p>:<div>
                            {this.state.experience.map((exp)=>{
                               return <div><h4 class="small font-weight-bold">{exp}<span class="float-right">40%</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "40%"}}><span class="sr-only">40%</span></div>
                                </div>
                                </div>
                                })}
                                <p className="h6 text-info">**You can add more experience from setting**</p>
                                </div>}
                                {/* <h4 class="small font-weight-bold">Server migration<span class="float-right">20%</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}><span class="sr-only">20%</span></div>
                                </div>
                                <h4 class="small font-weight-bold">Sales tracking<span class="float-right">40%</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "40%"}}><span class="sr-only">40%</span></div>
                                </div>
                                <h4 class="small font-weight-bold">Customer Database<span class="float-right">60%</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}}><span class="sr-only">60%</span></div>
                                </div>
                                <h4 class="small font-weight-bold">Payout Details<span class="float-right">80%</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: "80%"}}><span class="sr-only">80%</span></div>
                                </div>
                                <h4 class="small font-weight-bold">Account setup<span class="float-right">Complete!</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}><span class="sr-only">100%</span></div>
                                </div> */}
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
                                        <form >
                                            <div class="form-row">
                                                <div class="col">
                                                    <div class="form-group"><label for="username"><strong>Name</strong></label><p  className="h4 text text-primary"id="uname" name="username">{this.state.username}</p></div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group"><label for="email"><strong>Email Address</strong></label><p className="text text-primary"   id="uemail" name="email">{this.state.eid}</p></div>
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
                                        <p class="text-primary m-0 font-weight-bold">Contact Settings</p>
                                    </div>
                                    <div class="card-body">
                                        <form >
                                            <div class="form-group"><label for="address"><strong>Address</strong></label><input class="form-control" type="text" placeholder="Sunset Blvd, 38" name="address"/></div>
                                            <div class="form-row">
                                                <div class="col">
                                                    <div class="form-group"><label for="city"><strong>City</strong></label><input class="form-control" type="text" placeholder="Los Angeles" name="city"/></div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group"><label for="country"><strong>Country</strong></label><input class="form-control" type="text" placeholder="USA" name="country"/></div>
                                                </div>
                                            </div>
                                            {/* <div class="form-group"><button class="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button></div> */}
                                        </form>
                                    </div>
                                </div>
                                <div class="mb-3"><Link to="tsetting" class="btn btn-primary btn-sm" type="button" >Edit Profile</Link></div>
                            </div>
    
                        </div>
                    </div>
                </div>               
            </div>        
            </div>
        )
    }
}