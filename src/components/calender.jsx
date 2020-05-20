import React,{Component} from 'react';
import Calendar from 'react-calendar';
 import 'react-calendar/dist/Calendar.css';
import { stringify } from 'csv';

class Calender extends Component{
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
        // console.log(x.length);
        // for(var i=0;i<x.length;i++){
        //   console.log(x[i].innerHTML)
        // }
      })

  }

    getdata=(d)=>{
        const user={
            email:JSON.parse(localStorage.getItem("jwt")).user.id,
            date:d,
          }
    console.log(user.date);
    fetch("http://localhost:8082/getcalender", {
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
// for upload and delete ceode
//     updatedata=(d)=>{
//       const user={
//         sno:'',
//         description:'',
//         eventname:'',
//         }
//   console.log(user.date);
//   fetch("http://localhost:8082/updatecalender", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(user)
//     })
//   .then(res=> res.json())
//     .then(res => {
//       alert("data updated");
//     })
//   }
//   deleteddata=(d)=>{
//     const user={
//       sno:'',
//       }
// console.log(user.date);
// fetch("http://localhost:8082/deletecalender", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(user)
//   })
// .then(res=> res.json())
//   .then(res => {
//     alert("data updated");
//   })
// }

    onChange = (d) =>
    { 
        
      this.setState ( { date:d } )
      this.getdata(d.toLocaleDateString().toString());
    }    
    addcalender = () => {
        let ename=document.getElementById('evename').value;
        let des=document.getElementById('descrip').value;
        const ttuser={
          email:JSON.parse(localStorage.getItem("jwt")).user.id,
          date:this.state.date.toLocaleDateString().toString(),
          event:ename,
          description:des
        }
        // console.log(ttuser);
        fetch("http://localhost:8082/addtocalender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ttuser)
      })
        .then(res => res.json())
        .then(res => {
          if(res.code === 0)
          {
            alert("Item Not Added");
          }
          else
          {
          alert(`ITEM ADDED SUCCESFULLY!!`);
          console.log(ttuser.date);
          this.getdata(ttuser.date);
          }
          console.log("done");
        }); 
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
                <button class="btn btn-primary w-100 btn" data-toggle="modal" data-target="#exampleModal">Add Event</button>
                <ul class="list-group" style={{ height: "250px",overflow: "scroll" ,marginTop:"10px"}}>
                <li class="list-group-item active">{this.state.date.toLocaleDateString().toString()}</li>
                {this.myfunc()}
                </ul>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{this.state.date.toLocaleDateString().toString()}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <input type="text" className="form-control" id="evename" placeholder="Event Name"/>
      <input type="text" className="form-control" id="descrip" placeholder="Description"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>this.addcalender()}>Save changes</button>
      </div>
    </div>
  </div>
</div>
            </div>
        )
    }

}
export default Calender;
/*<h2>You Have Event <i>{this.state.eventname} </i>on this Date </h2>*/