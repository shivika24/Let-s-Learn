import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
  } from "react-router-dom";
  

class Taketest extends Component{
    constructor()
    {
        super();
        this.state={
            courses:[],r:false,p:0,rr:0,
            allcourses:[],
            takecourses:[]
        }
        this.get=this.get.bind(this);
        this.getcourses=this.getcourses.bind(this);
    }
    get()
    {
    if(this.state.rr==0)
    {
        
    fetch('http://localhost:8082/getcourse',
    {
      method: "GET",

    } )

    .then( res => {
      console.log(res)
          if(res.ok)
            return res.json()

      } )

    .then( res => {  
      var temp=[]; 
       res.map((e) => {
          // console.log(e);
          temp.push(e);
          this.setState({allcourses:temp,rr:1})
          
         })
        
      })
     
    }
    }

    
getcourses()
{
  
  if(JSON.parse(localStorage.getItem('jwt')).user.id&&this.state.r==0)
  {
  var data={
    id:JSON.parse(localStorage.getItem('jwt')).user.id,
  }

  fetch('http://localhost:8082/getcourseofstud',
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
        
        var temp = res[0].courses.split(",")
      this.setState({courses:temp,r:1})
      var temp=[]; 
      this.state.courses.map((e)=>{
          console.log("gg");
          this.state.allcourses.map((ee)=>{
                   console.log(ee);
                   console.log(e);
                    if(ee.cname==e)
                    {
                        console.log("hii");
                        // console.log(ee);
                        temp.push(ee);
                        this.setState({
                            takecourses:temp,
                        })
                    }
          })
      })
        
        } )
    }
    console.log(this.state.courses);
}
    // test()
    // {
    //     window.location.replace("http://localhost:3000/actualtest");
    // }
    
    render(){
        return ( <div>
           
     <div style={{backgroundImage: "linear-gradient(90deg, rgb(0, 140, 186) 17%, rgb(63, 98, 114) 100%)"}}>
       <div className="container">
           <div className="row"> 
               <div className="col" style={{textAlign: "center",padding: "40px"}}>
                   <h1 data-aos="fade-down" style={{color: "white",fontSize: "60px"}}>Your Own Platform,Make Your Future Bright! </h1>
               </div>
           </div>
       </div>
   </div>
   {this.state.r ? 
   <div className="pricing8 py-5">
   <div className="container">
   <div className="row mt-4">
{
   this.state.takecourses.map((e) => { return <div className="col-md-4 ml-auto pricing-box align-self-center">
       <center>
       <div className="card mb-4">
         <div className="card-body p-4 text-center">
         <img  src={e.image} width = {320} height={350}  /> <br/>
           <h5 className="font-weight-normal">{e.cname}</h5>
           
       
           <p className="mt-4">{e.description}</p>
         </div>
        
         <Link to="/actualtest"><button className="btn btn-info-gradiant p-3 btn-block border-0 text-white" href="#" onClick={() => { this.props.taketest1(e.cname) }}>Take Test</button></Link>
         
       </div>
       </center>
     </div>
   
     })}
     </div>
     </div>
    </div> :<div>
        {this.get()}
        {this.getcourses()}
    </div>}
    </div>
            
        )
    }
}

export default Taketest;
