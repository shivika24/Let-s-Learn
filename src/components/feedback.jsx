import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from '../images/test1.svg';
class Feedback extends Component
{
    render()
    {
        return (
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
          <center><h1>Submit Test Feedback</h1></center>
          <div className="form-group">
          <textarea className="form-control">Enter Feedback</textarea>
        </div>
  
          </div>                      
        </div><br/>
      <div className="row">
      <div className="col-12">
      <center><Link to="/"><button  id="button2" style={{marginLeft:"3%"}}>Submit</button></Link></center>
      </div>
      </div><br/>
      </div> 
      <br/><br/> 
      </div>
        )
    }
}
export default Feedback;
