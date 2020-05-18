import React, { Component } from 'react';
import './testlogin.css';
import img from '../images/test1.svg';
import { Link } from 'react-router-dom';
class Testlogin extends Component{
    
    constructor(){
        super();
        this.state={
            testname:"",
            teacherid:"",
            testid:"",
            studentname:"",
            studentroll:"",
            testcode:"",
            studentemail:"",
            password:""
        }
        this.tname="";
        this.teaid="";
        this.tid="";

      
    }
    componentDidMount(){
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
          this.tname=params.get('name');
          this.teaid=params.get('id');
          this.tid=params.get('code');
          this.setState({testname: this.tname });
          this.setState({teacherid:this.teaid});
          this.setState({testid:this.tid});

        //  this.setState({testname:params.get('name')});
    }
      onChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });
        // this.setState({ testname: this.tname ,teacherid:this.teaid ,testid:this.tid});

      }
      submitfunc=()=>{
        // this.setState({ testname: this.tname ,teacherid:this.teaid ,testid:this.tid});
        console.log(this.state);
      }
     
    // http://localhost:3000/testlogin/?name=c++&id=6356&code=88989
    // test link
    render(){
        return(
          <div>
          <div className="container5" style={{width:"60%",marginTop:"5%"}}>
          <div className="row">
          <div className="col-12">
          <img src={img} style={{height:"100%",width:"100%"}}/>
          </div> 
          </div>
          <div className="row">
          <div className="col-12">
          <br/><br/>
          <center><h1 id="s1">Test Name : {this.state.testname}</h1></center>
          <center><h3 id="s2">Test Id : {this.state.testid}</h3></center>
          </div>                      
        </div><br/>
      <div className="row">
      <div className="col-12">
      <center>
      <Link to={`/testloginsign?name=${this.state.testname}&id=${this.state.teacherid}&code=${this.state.testid}`} ><button id="button2"   style={{marginLeft:"3%"}}>Login</button></Link>
      <Link to={`/testloginsign?name=${this.state.testname}&id=${this.state.teacherid}&code=${this.state.testid}`}><button id="button2"  style={{marginLeft:"2%"}}>SignUp</button></Link></center>
      </div>
      </div><br/>
      </div> 
      <br/><br/> 
      </div>
      )
    }
}
export default Testlogin;

/*
               <form>
 <div className="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="name" name="studentname"  onChange={this.onChange} placeholder="Full Name"/>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name="studentemail"  onChange={this.onChange} placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="pass" name="password" onChange={this.onChange} placeholder="Password"/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Test-code</label>
    <input type="text" className="form-control" id="tcode" name="testcode" onChange={this.onChange} placeholder="Test-code"/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Roll no</label>
    <input type="text" className="form-control" id="rollno" name="studentroll" onChange={this.onChange} placeholder="Roll no"/>
  </div>
  
  <button type="button" className="btn btn-primary mb-3 mt-3" onClick={()=>{this.submitfunc()}}>Submit</button>
</form>*/