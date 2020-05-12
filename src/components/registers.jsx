import React, { Component } from "react";
import { Link } from "react-router-dom";
import './registers.css';
class Registers extends Component
{
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
        <form>
            <input type="text" name="sname" placeholder="Enter Student's name" pattern="[A-Za-z]" maxLength="20" required/>
            <input type="tel" name="srno" placeholder="Enter Student's roll number" pattern="[A-Za-z]{0-20}" maxLength="20" required/>
            <input type="email" name="semail" placeholder="enter your email-id" required/>
            <input type="tel" name="sphone" placeholder="enter Student's contact-no" maxLength="10"  minLength="10" title="enter only numbers" required/>
            <input type="text" name="syear" placeholder="enter Students Year" required/>
            <input type="password" name="spassword" placeholder="enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10"  required/> 
            <input type="password" name="srpassword" placeholder="re-enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" required/>
            <br/><br/>
            <center><button className="btn" style={{backgroundColor:"#1aa1d0",width:"200px",color:"white"}}>Submit</button></center>
        </form>
        <center><Link to="/Logins" style={{textDecoration:"none",color:"black"}}>Already Registered...?click here to login.</Link></center>
        <br/>
        </div>
        )
    }
}
export default Registers;