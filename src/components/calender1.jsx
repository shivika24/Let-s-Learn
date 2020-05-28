import React,{Component} from 'react';
import Calendar from 'react-calendar';
 import 'react-calendar/dist/Calendar.css';
import { stringify } from 'csv';

class Calender1 extends Component{
   constructor()
   {
    super();

    this.state = {
        date : new Date(),
        description:'',
        eventname : '',
        p:0,
        list:'',
        alleventdates:''
    }
   } 
   componentDidMount()
   {
    
    const user={
      email:JSON.parse(localStorage.getItem("jwt")).user.id,
    }
    fetch("http://localhost:8082/getallcalender", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(user)
      })
    .then(res=> res.json())
      .then(res => {
        this.setState({alleventdates:res.code})
        let x=document.getElementsByClassName('react-calendar__tile');
      })

  }

    getdata=(d)=>{
        const user={
            date:d,
          }
    console.log(user.date);
    fetch("http://localhost:8082/getcalender1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
      })
    .then(res=> res.json())
      .then(res => {
        this.setState({list:res.code})
      })
    }
    onChange = (d) =>
    { 
        
      this.setState ( { date:d } )
      this.getdata(d.toLocaleDateString().toString());
    }    

      myfunc = () =>{
        if(this.state.list)
        {
          const doubled = this.state.list.map((number,index) => 
          <li key={number.sno} className="list-group-item list-group-item-secondary">
            <p>{number.eventname}</p>
            <small>{number.description}</small>
            <hr/>
          </li>
        );
          return doubled;
  
        }
        else{
          console.log("error") 
        }
      }
    
    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-7">
                <Calendar  onChange = {this.onChange}  value = {this.state.date} />  
                </div>
                <div className="col-12 col-md-5">
                <ul class="list-group" style={{ height: "250px",overflow: "scroll" ,marginTop:"10px"}}>
                <li class="list-group-item active">{this.state.date.toLocaleDateString().toString()}</li>
                {this.myfunc()}
                </ul>
                </div>
            </div>
        )
    }

}
export default Calender1;
