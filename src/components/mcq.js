import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class extends Component{
 constructor(){
   super();
   this.state={
     submitted:[],
   }
   this.addSubmit=this.addSubmit.bind(this);
   this.sendToBack=this.sendToBack.bind(this);
   this.settotrue=this.settotrue.bind(this);
 }
 componentDidMount()
 {
  var url = new URL(window.location.href); 
  var params = new URLSearchParams(url.search);
  var obj={
     semail:JSON.parse(localStorage.getItem("jwt")).user.id,
     testid:params.get('code'),
     len:this.props.len
  }
   fetch("http://localhost:8082/initialResult",{
    method:"POST",
    headers:{
     Accept: "application/json",
       "Content-Type":"application/json",
       },
    body:JSON.stringify(obj)
})
   .then(res => {return res.json();})
   .then(res=>{
     if(res.resType===0)
     this.setState({submitted:res.arr},()=>{
       console.log("++"+this.state.submitted+"++");
     });
     else
     {
         for(var i=0;i<this.props.len;i++)
          this.state.submitted.push(-1);
         console.log(this.state.submitted)
     }
   })
  //  for(var i=0;i<this.props.len;i++)
  //  this.state.submitted.push(-1);
  //  console.log(this.state.submitted)
 }
 settotrue()
 {
   console.log("settotrue");
  //  window.location="http:localhost:3000/feedback";
   this.props.setToTrue(true);
 }
 addSubmit(qno)
 {
  var url = new URL(window.location.href); 
  var params = new URLSearchParams(url.search);
    if(document.getElementById(""+1).checked==true)
    this.state.submitted[qno]=1;
    else if(document.getElementById(""+2).checked==true)
    this.state.submitted[qno]=2;
    else if(document.getElementById(""+3).checked==true)
    this.state.submitted[qno]=3;
    else if(document.getElementById(""+4).checked==true)
    this.state.submitted[qno]=4;
  //  else this.state.submitted[qno]="na";
   fetch(`http://localhost:8082/updateRes?semail=${JSON.parse(localStorage.getItem("jwt")).user.id}&testid=${params.get('code')}`,{
      method:"POST",
      headers:{
        Accept: "application/json",
          "Content-Type":"application/json",
          },
       body:JSON.stringify(this.state.submitted)
   })
   .then(res => {return res.json();})
   .then(res=>{
     console.log("Result Array Updated!!")
   })
 }
 sendToBack(){
   console.log(this.state.submitted);
   var url = new URL(window.location.href); 
   var params = new URLSearchParams(url.search);
   var test={
     res:this.state.submitted,
     testid:params.get('code'),
     semail:JSON.parse(localStorage.getItem("jwt")).user.id
   }
    fetch("http://localhost:8082/submittedques",{
      method:"POST",
            headers:{
             Accept: "application/json",
               "Content-Type":"application/json",
               },
            body:JSON.stringify(test)
    })
    .then(res=>res.json())
    .then(res=>{
      console.log("Submitted");
    })
 }
    render()
    {
      var url = new URL(window.location.href); 
      var params = new URLSearchParams(url.search);
        return(
          
            
            <div className="col-xl-12  mb-4">
            {/* <div className="card border-left-primary shadow h-100 py-2"> */}
              <div className="card-body  border-left-primary shadow h-100 py-2">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xm font-weight-bold text-gray-800 mb-1">{this.props.mcq.ques}</div>
                    <div className="h5 mb-0 text-gray-800">
                        {this.props.mcq.choices.map((choice,index)=>{
                           return <div className="form-check">
                               
                                <h6 className="form-check-label" for="exampleRadios1">
                                  {
                                  this.state.submitted[this.props.idx]===(index+1)?
                                <input className="form-check-input" type="radio"  name="exampleRadios" id={index+1} value="option1" checked/>:
                                <input className="form-check-input" type="radio"  name="exampleRadios" id={index+1} value="option1"/>
                                }
                                  {choice}
                                  
                                 </h6>
                                 
                                 <br></br>
                            </div>
                        })}
                    
                    </div>
                    <div className="col-auto ">
                 <button type="button" className="btn btn mt-2 mx-2" onClick={()=>this.addSubmit(this.props.idx)}style={{backgroundColor:"rgb(8, 169, 222)", color:"white"}}>Submit Answer</button>
                 {this.props.idx<(this.props.len-1)?
                   <Link to={`/mcq?name=${params.get('name')}&id=${params.get('id')}&code=${params.get('code')}`} className="btn mt-2 mx-2" onClick={()=>this.props.nextMcq(this.props.idx+1)} style={{backgroundColor:"rgb(8, 169, 222)", color:"white"}}>Next Question</Link>:
                   <a href="#" className="btn btn-danger mt-2 mx-2" data-toggle="modal" data-target="#logoutModal" onClick={this.sendToBack}>
                        Finish Test
                    </a>
                 }
                 </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
            <div class="modal fade " id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header bg-info">
                          <h5 class="modal-title text-gray-800" id="exampleModalLabel">Do you really want to finish the test?</h5>
                          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div class="modal-body">Select "Yes" below if you are ready to end your test.</div>
                        <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <Link to="/feedback"class="btn btn-primary"  onClick={()=>this.settotrue(true)}>Yes</Link>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
          
        )
    }
}