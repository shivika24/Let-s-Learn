import React, { Component } from "react";
import { Link } from "react-router-dom";
import t1 from '../images/teacher.svg';
import './logint.css';
class Logint extends Component
{
    constructor()
    {
        super();this.state={
            temail:"",
            tpassword:""
        }
        this.func=this.func.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onfunc1 = this.onfunc1.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    onfunc1(e) {
    e.preventDefault();
        const newUser = {
            temail:this.state.semail,
            tpassword:this.state.spassword,
        };
        console.log(newUser);
    fetch("http://localhost:8082/tlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(res => {
        //alert(`TEACHER:${JSON.stringify(res)} LOGIN SUCCESFULLY!!`);
        if(res.code === 204)
        {
            alert("Email and password does not match");
        }
        else if(res.code === 206)
        {
            alert("Email Not Registered");
            window.location='http://localhost:3000/Registert';
        }
        else
        {
            localStorage.setItem("jwt", JSON.stringify(res));
            window.location='http://localhost:3000/teacherDashboard';
        }
        
      });
      }
    func()
    {
    var y = document.getElementById("i11");
    if(y.className==="fa fa-toggle-on")
    y.className="fa fa-toggle-off";
    else
    y.className="fa fa-toggle-on";
    var x = document.getElementById("spass");
    if (x.type === "password") {
    x.type = "text";
    } else {
    x.type = "password";
    }
    }
    render()
    {
        return (
            <div>
            <div className="row" style={{margin:0,padding:0}}>
            <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
            <img src={t1} style={{width:"100%",marginTop:"15%"}}/>
            </div>
            <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
            <div className="container4">
            <Link to="/Logins"><button id="bid2"><b>LOGIN AS STUDENT</b></button></Link><Link to="/Logint"><button id="bid2"><b>LOGIN AS TEACHER</b></button></Link>
            <h1>TEACHER LOGIN FORM</h1>
            <div className="row">
            <div className="col-6">
            <center><div className="g-signin2" data-onsuccess="onSignIn" style={{width:"140%"}}></div></center>
            </div>
          
            </div>
       
            <div className="row">
            <div className="col-12" style={{textAlign:"center"}}>
            <button id="github-button" className="btn" style={{color:"black",backgroundColor:"white"}}>
            <i className="fa fa-github"></i> Sign in with Github
            </button>
            </div>
            </div>
        <div className="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>

        <form>
            <input type="email" name="semail" placeholder="Enter your email-id" onChange={this.onChange} required/>
            <input type="password" name="spassword" id="spass" placeholder="Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={this.onChange} required/> 
            <br/><i id="i11" className="fa fa-toggle-off" style={{marginLeft:"50px"}} onClick={() => this.func()}></i>  <span id="span1">Show Password</span><br/><br/>
            <center><button className="btn"  id="submitbut1" onClick={(e)=>{this.onfunc1(e)}}>Sign In</button></center>
        </form>
        <center style={{marginTop: "20px"}}><Link to="/Registert" style={{textDecoration:"none",color:"black"}}>Not Registered Yet...?click here to register.</Link></center>
        <br/>
        </div>
            </div>
            </div>
            <br/><br/><br/>
        </div>
        )
    }
}
export default Logint;