import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Navbar extends Component{
    logoutfun=()=>{
       localStorage.removeItem('jwt');
       window.location="http://localhost:3000/";
    }
    render(){
        return(
    <div className="Navbar">
             {/* <!-- Start: Navigation with Button --> */}
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-button" style={{backgroundImage: "linear-gradient(90deg, #008CBA 17%, rgb(63, 98, 114) 100%)"}}>
        <div className="container">
            <Link className="navbar-brand" to="/">Company Name</Link>
        <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
            <span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse"
                id="navcol-1">
                <ul className="nav navbar-nav mr-auto">
                    <li className="nav-item" role="presentation"><Link className="nav-link"  to="/" style={{color: "white"}}>Home</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="about" style={{color: "white"}}>About Us</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="Pricing">Pricing &amp; Plans</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="Contact" style={{color: "white"}}>Contact Us</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/test" onClick={()=>this.props.test(false)} style={{color: "white"}}>Take Test</Link></li>
                </ul><span className="navbar-text actions"> 
                {
                localStorage.getItem('jwt')
                ?
                <div>
                    <Link className="btn btn-light action-button" to="/" style={{backgroundColor: "white",color: "#58a5ff"}} onClick={()=>{this.logoutfun()}}>Log Out</Link>
                </div>
                :
                <div>
                <Link className="login" to="/Logins" style={{color: "white"}}>Log In</Link>
                <Link className="btn btn-light action-button" role="button" to="Registers" style={{backgroundColor: "white",color: "#58a5ff"}}>Sign Up</Link>
                </div>
                }
                
                </span>
            </div>
        </div>
    </nav>
    {/* <!-- End: Navigation with Button --> */}
    </div>
        )
    }
}
export default Navbar;
