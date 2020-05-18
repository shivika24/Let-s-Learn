import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class TestDashboard extends Component{
    constructor()
    {
        super();
        this.state={
          test:[]
        }
    }
    componentDidMount(){
      var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
      fetch(` http://localhost:8082/mcq?testid=${params.get('code')}`, {
      method: "GET",
      headers:{  "Content-Type":"application/json" },
  })
.then(res => {return res.json();})
.then(res => {
      console.log(res);
      var temp=[]
      
      res.map((r)=>{
        var obj={ques:"",choices:[]}
            obj.ques=r.question;
            obj.choices.push(r.option1);
            obj.choices.push(r.option2)
            obj.choices.push(r.option3)
            obj.choices.push(r.option4)
            temp.push(obj);
      })
     this.setState({test:temp})
     console.log(this.state.test)
     this.props.test(this.state.test)
})
    }
  
    render()
    {
      console.log(this.state.test);
      var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
      return(
       this.state.test.map((t,index)=>{
           return  <div className="col-xl-12 mb-4 shadow-none p-2 mb-2 bg-light rounded" >
           <div className="card border-left-primary  ">
             <div className="card-body">
               <div className="row no-gutters align-items-center">
                 <div className="col mr-2">
                   <div className="text-xm font-weight-bold text-info mb-1">{index+1}.{t.ques}</div>
                 </div>
                 <div className="col-auto">
                   <Link to={`/mcq?name=${params.get('name')}&id=${params.get('id')}&code=${params.get('code')}`} className="btn text-xm" onClick={()=>this.props.selectMCQ(t,index)} style={{backgroundColor:"rgb(8, 169, 222)",color:"white"}}>Submit Answer</Link>
                 </div>
               </div>
             </div>
           </div>
         </div>
       })
      )}
}