import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class PremMcq extends Component{
 constructor(){
   super();
   this.state={
       mcqs:[],
       r:0,
     submitted:[],
   }
   this.addSubmit=this.addSubmit.bind(this);
   this.sendToBack=this.sendToBack.bind(this);
   this.settotrue=this.settotrue.bind(this);
 }
 componentDidMount()
 {
  
  var obj={
     semail:JSON.parse(localStorage.getItem("jwt")).user.id,
     testid:this.props.testname,
     len:this.props.len
  }
   fetch("http://localhost:8082/initialPremResult",{
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
//    for(var i=0;i<this.props.len;i++)
//    this.state.submitted.push(-1);
//    console.log(this.state.submitted)


 }
 settotrue()
 {
   console.log("settotrue");
  //  window.location="http:localhost:3000/feedback";
   this.props.setToTrue(true);
 }
 addSubmit(qno)
 {
  
    if(document.getElementById(""+1).checked==true)
    this.state.submitted[qno]=1;
    else if(document.getElementById(""+2).checked==true)
    this.state.submitted[qno]=2;
    else if(document.getElementById(""+3).checked==true)
    this.state.submitted[qno]=3;
    else if(document.getElementById(""+4).checked==true)
    this.state.submitted[qno]=4;
  //  else this.state.submitted[qno]="na";
   fetch(`http://localhost:8082/updatePremRes?semail=${JSON.parse(localStorage.getItem("jwt")).user.id}&testid=${this.props.testname}`,{
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
   var test={
     res:this.state.submitted,
     testid:this.props.testname,
     semail:JSON.parse(localStorage.getItem("jwt")).user.id
   }
    fetch("http://localhost:8082/submittedPremques",{
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
    //   var url = new URL(window.location.href); 
    //   var params = new URLSearchParams(url.search);
    console.log("pr: "+this.props.selectedp);
    const len=this.props.len;
        const items = []
       for (let i=0;i<len ; i++) {
            items.push(<li class="nav-item " key={i}>
            <Link className="btn  btn-circle btn-md text-xm" style={{backgroundColor:"rgb(159, 196, 216)"}} onClick={()=>this.props.selectMCQ(i,len)}>{i+1}</Link>
             <hr class="sidebar-divider"></hr></li>)
             }
        return(
            <div id="page-top">
                <div id="wrapper">
                <ul class="navbar-nav sidebar sidebar-dark accordion text-center "  id="accordionSidebar">
                  <li class="nav-item active">
                   <Link class="nav-link" to="/actualtest">
                   <i class="fas fa-fw fa-tachometer-alt"></i>
                   <span>Dashboard</span></Link>
                   </li><br></br>
                  <hr class="sidebar-divider"></hr>
                {items}
              </ul>
              <div id="content-wrapper" className="d-flex flex-column">
                 <div id="content">
                {/* {this.getmcqs()} */}
            {/* <div className="card border-left-primary shadow h-100 py-2"> */}
              <div className="card-body  border-left-primary shadow h-100 py-2">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xm font-weight-bold text-gray-800 mb-1">{this.props.selectedp.question}</div>
                    <div className="h5 mb-0 text-gray-800">
                         <div className="form-check">
                                <h6 className="form-check-label" for="exampleRadios1">
                                  {
                                  this.state.submitted[this.props.prmcq]===1?
                                <input className="form-check-input" type="radio"  name="exampleRadios" id="1" value="option1" checked/>:
                                <input className="form-check-input" type="radio"  name="exampleRadios" id="1" value="option1"/>
                                }
                                {this.props.selectedp.option1}
                                 </h6>
                                 <br></br>
                            </div>
                            <div className="form-check">
                                <h6 className="form-check-label" for="exampleRadios1">
                                  {
                                  this.state.submitted[this.props.prmcq]===1?
                                <input className="form-check-input" type="radio"  name="exampleRadios" id="2" value="option1" checked/>:
                                <input className="form-check-input" type="radio"  name="exampleRadios" id="2" value="option1"/>
                                }
                                {this.props.selectedp.option2}
                                 </h6>
                                 <br></br>
                            </div>
                            <div className="form-check">
                                <h6 className="form-check-label" for="exampleRadios1">
                                  {
                                  this.state.submitted[this.props.prmcq]===1?
                                <input className="form-check-input" type="radio"  name="exampleRadios" id="3" value="option1" checked/>:
                                <input className="form-check-input" type="radio"  name="exampleRadios" id="3" value="option1"/>
                                }
                                {this.props.selectedp.option3}
                                 </h6>
                                 <br></br>
                            </div>
                            <div className="form-check">
                                <h6 className="form-check-label" for="exampleRadios1">
                                  {
                                  this.state.submitted[this.props.prmcq]===1?
                                <input className="form-check-input" type="radio"  name="exampleRadios" id="4" value="option1" checked/>:
                                <input className="form-check-input" type="radio"  name="exampleRadios" id="4" value="option1"/>
                                }
                                {this.props.selectedp.option4}
                                 </h6>
                                 <br></br>
                            </div>
                    
                    </div>
                    <div className="col-auto ">
                 <button type="button" className="btn btn mt-2 mx-2" onClick={()=>this.addSubmit(this.props.prmcq)}style={{backgroundColor:"rgb(8, 169, 222)", color:"white"}}>Submit Answer</button>
                 {this.props.prmcq<(this.props.len-1)?
                   <Link to="/premMcq" className="btn mt-2 mx-2" onClick={()=>this.props.nextMcq(this.props.prmcq+1,this.props.len)} style={{backgroundColor:"rgb(8, 169, 222)", color:"white"}}>Next Question</Link>:
                   <a href="#" className="btn btn-danger mt-2 mx-2" data-toggle="modal" data-target="#logoutModal" onClick={this.sendToBack}>
                        Finish Test
                    </a>
                 }
                 </div>
                  </div>
                </div>
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
                          <button onClick={()=>{window.location=`http://localhost:3000/showPremResult?testid=${this.props.testname}`}} class="btn btn-primary"  >Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
          
        )
    }
}