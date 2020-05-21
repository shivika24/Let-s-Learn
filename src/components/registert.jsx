import React, { Component, useReducer } from "react";
import { Link } from "react-router-dom";
import './registert.css';
class Registert extends Component
{
    constructor()
    {
        super();
        this.state={
            tname:"",
            tid:"",
            tpno:"",
            temail:"",
            tpassword:"",
            tpassword1:""
        }
        this.onChange = this.onChange.bind(this);
        this.onfunc = this.onfunc.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    onfunc(e) {
    e.preventDefault();
      const email=document.getElementById("temail").value;
        const newUser = {
            tname:this.state.tname,
            tid:this.state.tid,
            temail:email,
            tpno:this.state.tphone,
            tpassword:this.state.tpassword,
            tpassword1:this.state.tpassword1
        };
        console.log(newUser);
        if(newUser.tpassword===newUser.tpassword1)
        {
    fetch("http://localhost:8082/tregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(res => {
        if(res.resType === 0)
        {
          alert("Teacher Already Exists");
          window.location='http://localhost:3000/Logint';
        }
        else if(res.resType === 1)
        {
          alert("Passwords Do Not Match");
        }
        else
        {
        alert(`TEACHER:${JSON.stringify(res)} REGISTERED SUCCESFULLY!!`);
        window.location='http://localhost:3000/Logint';
        }
        console.log("done");
      });
    }
    else
    {
      alert("Passwords Entered Do Not  Match");
      window.location='http://localhost:3000/Registert';
    }
      }
    render()
    {
        return (
            <div className="container2">
            <Link to="/Registers"><button id="bid1"><b>STUDENT</b></button></Link><Link to="/Registert"><button id="bid1"><b>TEACHER</b></button></Link>
            <h1 style={{fontSize:"24"}} >TEACHER REGISTERATION</h1>
        <center><div className="g-signin2" data-onsuccess="onSignIn" style={{width:"300px"}}></div></center>
        <div className="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
        <center><button id="github-button" className="btn" style={{color:"black",backgroundColor:"white"}}>
        <i className="fa fa-github"></i> Sign in with Github
      </button></center>
        <form>
            <input type="text" name="tname" placeholder="Enter Teacher's name" pattern="[A-Za-z]" maxLength="20" onChange={this.onChange} required/>
            <input type="tel" name="tid" placeholder="Enter Teacher's id" pattern="[A-Za-z]" maxLength="20" onChange={this.onChange} required/>
            <input type="email" name="temail" id="temail" placeholder="Enter your email-id" onChange={this.onChange} required/>
            <input type="tel" name="tphone" placeholder="Enter Teacher's contact-no" title="enter only numbers" maxLength="10" minLength="10" onChange={this.onChange} required/>
            <input type="password" name="tpassword" placeholder="Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={this.onChange} required/> 
            <input type="password" name="tpassword1" placeholder="Re-Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={this.onChange} required/>
            <br/><br/>
            <center><button className="btn" style={{backgroundColor:"#1aa1d0",width:"200px",color:"white"}} onClick={(e)=>{this.onfunc(e)}}>Submit</button></center>
        </form>
        <center><Link to="/Logint" style={{textDecoration:"none",color:"black"}}>Already Registered...?click here to login.</Link></center>
        <br/>
        </div>
        )
    }
}
export default Registert;