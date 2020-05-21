import React, { Component } from "react";
import { Link } from "react-router-dom";
import './registers.css';
class Registers extends Component
{
    constructor()
    {
        super();
        this.state={
            sname:"",
            srollno:"",
            spno:"",
            semail:"",
            syear:"",
            spassword:"",
            spassword1:""
        }
        this.onChange = this.onChange.bind(this);
        this.onfunc = this.onfunc.bind(this);
        this.f1=this.f1.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    onfunc(e) {
    e.preventDefault();
      const email=document.getElementById("semail").value;
      const year=document.getElementById("syear").value;
        const newUser = {
            sname:this.state.sname,
            srollno:this.state.srno,
            semail:email,
            spno:this.state.sphone,
            syear:year,
            spassword:this.state.spassword,
            spassword1:this.state.spassword1
        };

        console.log(newUser);
        if(newUser.spassword===newUser.spassword1)
        {
    fetch("http://localhost:8082/register", {
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
          alert("Student Already Exists");
          window.location='http://localhost:3000/Logins';
        }
        else if(res.resType === 101)
        {
          alert("PASSWORDS DON'T MATCH");
        }
        else
        {
        alert(`NEW STUDENT REGISTERED SUCCESFULLY!!`);
        this.f1();
        //window.location="http://localhost:3000/Logins";
        }
        console.log("done");
      });     
      }
      else
      {
        alert("Passwords Entered Do Not  Match");
        window.location='http://localhost:3000/Registers';
      }
      
      }
      f1()
      {
        console.log("f1");
        const email=document.getElementById("semail").value;
        const user = {
          semail:email,
        };
        fetch("http://localhost:8082/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(res => {  
          console.log(res.resType); 
         if(res.resType === "102")
         {     
          alert(`MAIL SENT SUCCESSFULLY`);
          window.location="http://localhost:3000/Logins";
         }
          console.log("done");
        });
      
      }
    render()
    {
        return (
            <div className="container1">
            <Link to="/Registers"><button id="bid1"><b>STUDENT</b></button></Link><Link to="/Registert"><button id="bid1"><b>TEACHER</b></button></Link>
            <h1>STUDENT REGISTERATION</h1>
        <center><div className="g-signin2" data-onsuccess="onSignIn" style={{width:"300px"}}></div></center>
        <div className="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
        <center><button id="github-button" className="btn" style={{color:"black",backgroundColor:"white"}}>
        <i className="fa fa-github"></i> Sign in with Github
      </button></center>
        <form onSubmit={this.onfunc}>
            <input type="text" name="sname" placeholder="Enter Student's name"  maxLength="20" onChange={this.onChange} required/>
            <input type="tel" name="srno" placeholder="Enter Student's roll number" maxLength="20" onChange={this.onChange} required/>
            <input type="email" name="semail" id="semail" placeholder="enter your email-id" required/>
            <input type="tel" name="sphone" placeholder="enter Student's contact-no" maxLength="10"  minLength="10" title="enter only numbers" onChange={this.onChange} required/>
            <input type="text" name="syear" id="syear" placeholder="enter Students Year" required/>
            <input type="password" name="spassword" placeholder="enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={this.onChange}  required/> 
            <input type="password" name="spassword1" placeholder="re-enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" onChange={this.onChange} required/>
            <br/><br/>
            <center><button type="submit" className="btn" style={{backgroundColor:"#1aa1d0",width:"200px",color:"white"}}>Submit</button></center>
        </form>
        <center><Link to="/Logins" style={{textDecoration:"none",color:"black"}}>Already Registered...?click here to login.</Link></center>
        <br/>
        </div>
        )
    }
}
export default Registers;