import React, { Component } from "react";
import { Link } from "react-router-dom";
import './registert.css';
class Registert extends Component
{
    render()
    {
        return (
            <div className="container2">
            <Link to="/Registers"><button id="bid1"><b>REGISTER AS STUDENT</b></button></Link><Link to="/Registert"><button id="bid1"><b>REGISTER AS TEACHER</b></button></Link>
            <h1>COLLEGE/TEACHER REGISTERATION FORM</h1>
        <center><div className="g-signin2" data-onsuccess="onSignIn" style={{width:"300px"}}></div></center>
        <div className="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
        <center><button id="github-button" className="btn" style={{width:"300px",color:"black",backgroundColor:"white"}}>
        <i className="fa fa-github"></i> Sign in with Github
      </button></center>
        <form>
            <input type="text" name="tname" placeholder="Enter Teacher's name" pattern="[A-Za-z]" maxLength="20" required/>
            <input type="tel" name="tid" placeholder="Enter Teacher's id" pattern="[A-Za-z]{0-20}" maxLength="20" required/>
            <input type="email" name="temail" placeholder="Enter your email-id" required/>
            <input type="tel" name="tphone" placeholder="Enter Teacher's contact-no" title="enter only numbers" maxLength="10" minLength="10" required/>
            <input type="password" name="tpassword" placeholder="Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" required/> 
            <input type="password" name="trpassword" placeholder="Re-Enter your password" pattern=".{6,}" title="Six or more characters" maxLength="10" required/>
            <br/><br/>
            <center><button className="btn" style={{backgroundColor:"#1aa1d0",width:"200px",color:"white"}}>Submit</button></center>
        </form>
        <center><Link to="/Logint" style={{textDecoration:"none",color:"black"}}>Already Registered...?click here to login.</Link></center>
        <br/>
        </div>
        )
    }
}
export default Registert;