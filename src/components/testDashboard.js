import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class TestDashboard extends Component{
    // constructor()
    // {
    //     super();
        
    // }
  
    render()
    {
      
      return(
       this.props.test.map((t,index)=>{
           return  <div className="col-xl-3 col-md-12 mb-4 shadow-none p-2 mb-2 bg-light rounded">
           <div className="card border-left-primary  ">
             <div className="card-body">
               <div className="row no-gutters align-items-center">
                 <div className="col mr-2">
                   <div className="text-xm font-weight-bold text-info mb-1">{index+1}.{t.ques}</div>
                 </div>
                 <div className="col-auto">
                   <Link to="/mcq" className="btn btn-primary text-xm"onClick={()=>this.props.selectMCQ(t,index)}>Submit Answer</Link>
                 </div>
               </div>
             </div>
           </div>
         </div>
       })
      )}
}