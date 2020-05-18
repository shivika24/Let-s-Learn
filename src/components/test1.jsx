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
            password:"",
            msg:""
        }
        this.tname="";
        this.teaid="";
        this.tid="";
        //this.msg=""
      
    }
    componentDidMount(){
      //console.log(this.props.tID1);
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
          this.tname=params.get('name');
          this.teaid=params.get('id');
          this.tid=params.get('code');
          console.log(this.tname)
          console.log(this.teaid)
          console.log(this.tid)
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
        var testcode=document.getElementById("tcode").value;
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        var x=params.get('name');
        var y=params.get('id');
        var z=params.get('code');
        if(this.state.testid!==testcode){
        alert("Please enter valid test key!!")
        window.location=`/test1?name=`+x+`&id=`+y+`&code=`+z;
        this.setState({msg:"Please enter valid test key!!"});
        }
        else this.props.setfalse(false);
        console.log(this.state);
      }
     
    // http://localhost:3000/testlogin/?name=c++&id=6356&code=88989
    // test link
    render(){
        // console.log(this.props.test)
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
          <p className="text text-danger">{this.state.msg}</p>
          <div className="form-group">
    <input type="text" className="form-control" id="tcode" name="testcode" onChange={this.onChange} placeholder="Test-code" required/>
  </div>
  <div className="form-group">
    <input type="text" className="form-control" id="rollno" name="studentroll" onChange={this.onChange} placeholder="Roll no" required/>
  </div>
          </div>                      
        </div><br/>
      <div className="row">
      <div className="col-12">
      <center><Link to={`/test?name=${this.state.testname}&id=${this.state.teacherid}&code=${this.state.testid}`}><button onClick={()=>this.submitfunc()} id="button2" style={{marginLeft:"3%"}}>Proceed</button></Link></center>
      </div>
      </div><br/>
      </div> 
      <br/><br/> 
      </div>
      )
    }
}
export default Test1;
