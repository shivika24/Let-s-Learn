import React, { Component } from 'react';

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
               <div className="container mb-3 mt-3">
                   <div className="row">
                       <div className="col-12">
                       <p>Test Name : {this.state.testname}</p>
                       <p>Test Id : {this.state.testid}</p>
                       </div>
                      
                   </div>
                   <h3>Login For Test</h3>
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
</form>
               </div>
            </div>
        )
    }
}
export default Testlogin;