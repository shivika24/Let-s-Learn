import React, { Component } from 'react';
import './testlogin.css';
import img from '../images/test1.svg';
import { Link } from 'react-router-dom';
class Test1 extends Component{
    
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
          <div className="form-group">
    <input type="text" className="form-control" id="tcode" name="testcode" onChange={this.onChange} placeholder="Test-code"/>
  </div>
  <div className="form-group">
    <input type="text" className="form-control" id="rollno" name="studentroll" onChange={this.onChange} placeholder="Roll no"/>
  </div>
          </div>                      
        </div><br/>
      <div className="row">
      <div className="col-12">
      <center><button id="button2" style={{marginLeft:"3%"}}>Proceed</button></center>
      </div>
      </div><br/>
      </div> 
      <br/><br/> 
      </div>
      )
    }
}
export default Test1;
