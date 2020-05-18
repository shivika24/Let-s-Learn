import React, { Component } from "react";
import { Link } from "react-router-dom";
import t1 from '../images/teacher.svg';
import './logint.css';
class Testloginregister extends Component
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
      //  this.f1=this.f1.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    onfunc(e) {
    e.preventDefault();
    var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
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
          window.location=`http://localhost:3000/testloginsign?name=${params.get('name')}&id=${params.get('id')}&code=${params.get('code')}`;
        }
        else if(res.resType === 101)
        {
          alert("PASSWORDS DON'T MATCH");
        }
        else
        {
        alert(`NEW STUDENT REGISTERED SUCCESFULLY!!`);
        window.location=`http://localhost:3000/testloginsign?name=${params.get('name')}&id=${params.get('id')}&code=${params.get('code')}`;
        }
        console.log("done");
      });     
      
      }
    //   f1()
    //   {
    //     console.log("f1");
    //     const email=document.getElementById("semail").value;
    //     const user = {
    //       semail:email,
    //     };
    //     fetch("http://localhost:8082/send", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(user)
    //   })
    //     .then(res => res.json())
    //     .then(res => {  
    //       console.log(res.resType); 
    //      if(res.resType === "102")
    //      {     
    //       alert(`MAIL SENT SUCCESSFULLY`);
    //       window.location="http://localhost:3000/testloginsign";
    //      }
    //       console.log("done");
    //     });
      
    //   }
    render()
    {
      var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        return (
            <div>
            <div className="row" style={{margin:0,padding:0}}>
            <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
            <img src={t1} style={{width:"100%",marginTop:"30%"}}/>
            </div>
            <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
            <div className="container4">
            <h1>REGISTERATION FORM</h1>
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

       
           <div className="row">
           <div className="col">
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
        <center style={{marginTop: "20px",marginBottom:"10%"}}><Link to={`/testloginsign?name=${params.get('name')}&id=${params.get('id')}&code=${params.get('code')}`} style={{textDecoration:"none",color:"black"}}>Already Registered Yet...?click here to login.</Link></center>
           </div>
           </div>
            <br/>
            {/* <i id="i11" className="fa fa-toggle-off" style={{marginLeft:"50px"}}>    </i>  */}
              </div>
              </div>
              </div>
            <br/><br/><br/>
        </div>
        )
    }
}
export default Testloginregister;