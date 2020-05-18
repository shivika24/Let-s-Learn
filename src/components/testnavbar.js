import React,{Component} from 'react';
import {Link,BrowserRouter} from 'react-router-dom';
export default class TestNavbar extends Component
{ 
  constructor(){
    super();
    let u="Name"
      try{
        u =  JSON.parse(localStorage.getItem("jwt")).user.name;
      }catch(e){
          u=""
      }
      this.state={
        name:u
      }
  }
    render(){
        return( 
            
             <nav className="navbar navbar-expand navbar-light p-1 mb-2  topbar mb-4 static-top shadow"  style={{backgroundImage: "linear-gradient(90deg, #008CBA 17%, rgb(63, 98, 114) 100%)"}}>
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
                 </button>

               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav" style={{margin: "auto"}}>
                        <li className="nav-item">
                        <h4 class="small font-weight-bold text-gray-800">Submitted</h4>
                        <div class="progress mb-12 " style={{width:"22vw"}}>
                          <div class="progress-bar" role="progressbar" style={{width: "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                          <span class="float-right">20%</span>
                       </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-2" >
                    <li className="nav-item">
                    <a className="btn btn-danger btn-sm" href="#" data-toggle="modal" data-target="#logoutModal"style={{textDecoration:"none",color:"white"}}>
                         End Test
                    </a>
                      </li>
                      </ul>
                      <ul className="navbar-nav" style={{float:"right"}} >
                     <li className="nav-item">
        <span className="mr-2 d-none d-lg-inline font-weight-bold text-uppercase text-light small">{this.state.name}</span>
                     <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="Not Available"/>
                     </li>
                    </ul>
                </div> 

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
                          <Link class="btn btn-primary" to="/feedback">Yes</Link>
                        </div>
                      </div>
                    </div>
                  </div>  
             </nav>
            
        )
    }
}