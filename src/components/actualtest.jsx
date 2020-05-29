import React, { Component } from "react";
import { Link } from "react-router-dom";
class Actualtest extends Component{
    constructor()
    {
        super();
        this.state={
            mcqs:[],
            r:0
        }
    }
    componentDidMount()
    {
        this.getmcqs();
    }
    getmcqs()
    {
        console.log("hello");
        if(this.state.r==0)
        {
        var data = {
            test : this.props.testname
        }
        fetch('http://localhost:8082/getmcqs',
      {
        method: "PUT",

          headers:{  "Content-Type":"application/json",  },

            body:JSON.stringify(data),
      } )

      .then( res => {

            if(res.ok)
              return res.json()

        } )

      .then( res => {
        
           this.setState(
               {
                   mcqs:res,
                   r:1
               }
           )
           console.log(this.state.mcqs);
           this.props.premMcqs(this.state.mcqs);
        } )
        
    }
   
    }
    render(){
        const len=this.state.mcqs.length;
        const items = []
       for (let i=0;i<len ; i++) {
            items.push(<li class="nav-item " key={i}>
            <Link to="/premMcq" className="btn  btn-circle btn-md text-xm" style={{backgroundColor:"rgb(159, 196, 216)"}} onClick={()=>this.props.selectMCQ(i,this.state.mcqs.length)}>{i+1}</Link>
             <hr class="sidebar-divider"></hr></li>)
             }
        return (<div id="page-top">
            
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
                 {this.state.mcqs.map((t,index)=>{
           return  <div className="col-xl-12 mb-4 shadow-none p-2 mb-2 bg-light rounded" >
           <div className="card border-left-primary  ">
             <div className="card-body">
               <div className="row no-gutters align-items-center">
                 <div className="col mr-2">
                   <div className="text-xm font-weight-bold text-info mb-1">{index+1}.{t.question}</div>
                 </div>
                 <div className="col-auto">
                   <Link to="/premMcq"className="btn text-xm" onClick={()=>this.props.selectMCQ(index,this.state.mcqs.length)} style={{backgroundColor:"rgb(8, 169, 222)",color:"white"}}>Submit Answer</Link>
                 </div>
               </div>
             </div>
           </div>
         </div>
       })}
                  </div>
              </div>
            </div>
        </div>)
    }
}

export default Actualtest;